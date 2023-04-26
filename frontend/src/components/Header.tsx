import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { logout } from '../features/auth/authSlice'
import { useEffect, useState } from 'react'
import { logoutToast } from './toastFunctions'
import { useGetAllReminders } from '../hooks/useGetAllReminders'
// import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  let [sortOption, setSortOption] = useState<string>("lastUpdated")

  




  const onLogout = () => {
    navigate('/login')
    logoutToast(`👋 See you later`)
    dispatch(logout())

  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/' >Remind Me</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header