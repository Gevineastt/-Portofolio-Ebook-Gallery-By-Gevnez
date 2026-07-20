import { createContext, useState, useEffect, useContext } from 'react';
import { supabase, authService } from '../services/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check session on mount
    useEffect(() => {
        checkSession();

        // Listen untuk auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user || null);
            }
        );

        return () => subscription?.unsubscribe();
    }, []);

    const checkSession = async () => {
        try {
            setLoading(true);
            const { session } = await supabase.auth.getSession();
            setUser(session?.user || null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const result = await authService.signIn(email, password);
            if (!result.success) {
                setError(result.error);
                return false;
            }
            setUser(result.data.user);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    const signup = async (email, password) => {
        try {
            setError(null);
            const result = await authService.signUp(email, password);
            if (!result.success) {
                setError(result.error);
                return false;
            }
            // After signup, automatic login
            const loginResult = await login(email, password);
            return loginResult;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    const logout = async () => {
        try {
            setError(null);
            const result = await authService.signOut();
            if (!result.success) {
                setError(result.error);
                return false;
            }
            setUser(null);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook untuk use auth
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
export default AuthProvider;
