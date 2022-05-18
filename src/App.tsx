import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Register } from './Pages/Authentication/Register';
import { Home } from './Pages/Home/Home';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
     </Routes>      
    </div>
  );
}

export default App;
