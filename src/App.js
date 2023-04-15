import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Page/Home/Home';
import About from './Page/About/About';
import Login from './Page/Login/Login';
import Register from './Page/Register/Register';
import ShoppingCart from './Page/ShoppingCart/ShoppingCart';
import TestUser from './Component/TestUser';
import Term from './Component/Term';
import Dashboard from './Page/Dashboad/Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/About' element={<About />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Register' element={<Register />}></Route>
        <Route path='/ShoppingCart' element={<ShoppingCart />}></Route>
        <Route path='/Term' element={<Term />}></Route>
        <Route path='/Test' element={<TestUser />}></Route>
        <Route path='/Dashboard' element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </div>
  );
}

export default App;
