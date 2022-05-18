import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Authentication/Login';
import { Register } from './Pages/Authentication/Register';
import { Home } from './Pages/Home/Home';
import { ManageTodo } from './Pages/ManageTodo/ManageTodo';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/managetodo" element={<ManageTodo/>}/>
        <Route path="/viewtask" element={<ViewTask/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
     </Routes>      
    </div>
  );
}

export default App;
