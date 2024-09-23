import './App.css';
import Index from './pages/Index';
import Capitais from './pages/Capitais';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/capitais" element={<Capitais />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
