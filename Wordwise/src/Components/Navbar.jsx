import { useState } from 'react';

import { Link} from 'react-router-dom';
const Navbar = ({isAuth, setIsAuth}) => {
  const [expanded, setExpanded]=useState(false)
  return (<>

    <div className="nav">
    <div className='nav-title'>
        <Link to='/home' id="main-title">Wordwise</Link>
    </div>
        <div className='nav-links'>
            {isAuth&&<ul id="nav-links">
                <Link to='/write' className='nav-link'>Write</Link>
                <Link to='/' className='nav-link' onClick={()=>{
                  localStorage.removeItem('token')
                  localStorage.removeItem('user')
                  setIsAuth(false)
                }}>Logout</Link>
            </ul> }
        </div>
        {((window.innerWidth<767) )&&<div className='button'>
        <button  className='nav-button'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={()=>setExpanded(prev=>!prev)}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
      </svg>
        </button>
        </div>}

    </div>

    {((window.innerWidth<767) && expanded)&&<div className="expanded">
    <ul id="nav-links-exp">
                <Link to='/write' className='nav-link'>Write</Link>
                <Link to='/' className='nav-link' onClick={()=>{
                  localStorage.removeItem('token')
                  localStorage.removeItem('user')
                  setIsAuth(false)
                }}>Logout</Link>
            </ul>
    </div>}
  </>
  )
}
export default Navbar