import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Authentication/Login';
import { Register } from './Pages/Authentication/Register';
import { Home } from './Pages/Home/Home';
import { ManageTodo } from './Pages/ManageTodo/ManageTodo';
import { ViewTask } from './Pages/ViewTask/ViewTask';
import { ToastContainer } from 'react-toastify';
import {QueryClient,QueryClientProvider} from 'react-query'
import 'react-toastify/dist/ReactToastify.css';
import { RequireAuth } from './Pages/Shared/RequireAuth';
import Header from './Pages/Shared/Header';

function App() {
  const queryClient = new QueryClient()

  return (
    <div className="App">
       <QueryClientProvider client={queryClient}>
         <Header/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/managetodo" element={<RequireAuth><ManageTodo/></RequireAuth>}/>
              <Route path="/viewtask" element={<RequireAuth><ViewTask/></RequireAuth>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes> 
       </QueryClientProvider>
     <ToastContainer />     
    </div>
  );
}

export default App;
