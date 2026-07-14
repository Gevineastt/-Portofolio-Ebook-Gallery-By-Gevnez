import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portofolio from './Pages/Portofolio';
import Gallery from './Pages/Gallery';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/portfolio" element={<Portofolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;