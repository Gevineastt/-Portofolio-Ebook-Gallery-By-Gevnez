import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://khnlwcxuxalymmazgwnl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtobmx3Y3h1eGFseW1tYXpnd25sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDQxNjEsImV4cCI6MjA5ODIyMDE2MX0.8o6z_ScrpA1vHT4bFypxyhtUmQk5fX3lv8ALzUB5XdQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions
export const authService = {
    // Sign up dengan email & password
    async signUp(email, password) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Login dengan email & password
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Logout
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Get current session
    async getSession() {
        try {
            const { data, error } = await supabase.auth.getSession();
            if (error) throw error;
            return { success: true, session: data.session };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Get current user
    async getCurrentUser() {
        try {
            const { data, error } = await supabase.auth.getUser();
            if (error) throw error;
            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
};

// Ebook service
export const ebookService = {
    // Fetch all ebooks
    async getEbooks() {
        try {
            const { data, error } = await supabase
                .from('ebooks')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Get single ebook
    async getEbookById(id) {
        try {
            const { data, error } = await supabase
                .from('ebooks')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Search ebooks
    async searchEbooks(query) {
        try {
            const { data, error } = await supabase
                .from('ebooks')
                .select('*')
                .ilike('title', `%${query}%`)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
};

// Purchase service
export const purchaseService = {
    // Check if user bought ebook
    async checkPurchase(userId, ebookId) {
        try {
            const { data, error } = await supabase
                .from('purchases')
                .select('*')
                .eq('user_id', userId)
                .eq('ebook_id', ebookId)
                .eq('payment_status', 'success')
                .single();

            return { success: true, purchased: !!data };
        } catch (error) {
            return { success: true, purchased: false };
        }
    },

    // Get user purchases
    async getUserPurchases(userId) {
        try {
            const { data, error } = await supabase
                .from('purchases')
                .select('ebook_id, purchased_at, payment_status')
                .eq('user_id', userId)
                .eq('payment_status', 'success')
                .order('purchased_at', { ascending: false });

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Create purchase (payment pending)
    async createPurchase(userId, ebookId, amount) {
        try {
            const { data, error } = await supabase
                .from('purchases')
                .insert([
                    {
                        user_id: userId,
                        ebook_id: ebookId,
                        amount_paid: amount,
                        payment_status: 'pending',
                        payment_method: 'qris',
                    },
                ])
                .select()
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Update purchase status
    async updatePurchaseStatus(purchaseId, status) {
        try {
            const { data, error } = await supabase
                .from('purchases')
                .update({ payment_status: status })
                .eq('id', purchaseId)
                .select()
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
};