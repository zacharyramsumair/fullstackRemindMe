import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import SingleReminder from "./pages/SingleReminder"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  



  return (
    <>
    <Router>
        <div className='container'>
          <Header />

          <Routes>
            <Route path='/' element={<SingleReminder />} />
            <Route path='/reminder/:id' element={<SingleReminder />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </>
  )
}

export default App
