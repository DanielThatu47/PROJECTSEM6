import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Logo from '../images/logo.png'
import Hero from '../images/hero.png'

const HomePage = ({ showPlusIcon = true }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [forTextIndex, setForTextIndex] = useState(0);
  const forTexts = ["Teachers", "Students", "Learners"];
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };
  
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  useEffect(() => {
    const interval = setInterval(() => {
      setForTextIndex((prevIndex) => (prevIndex + 1) % forTexts.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <nav className="navbar flex justify-between items-center bg-white p-3 shadow-lg">
        <div className="navbar-brand">
          {isAuthenticated ? (
            <a href="/" className="flex items-center" onClick={handleClick}>
              <img src={Logo} alt="logo" className="w-10 h-10" />
              <span className="brand-name text-2xl font-semibold ml-2">EzOuiz</span>
            </a>
          ) : (
            <a href="/" className="flex items-center">
              <img src={Logo} alt="logo" className="w-10 h-10" />
              <span className="brand-name text-2xl font-semibold xl-2">EzOuiz</span>
            </a>
          )}
        </div>
        <div className="navbar-icons flex items-center">
        {isAuthenticated && (
            <a href="/Userclass" className="mr-4">View Classrooms</a> 
          )}
          {isAuthenticated && showPlusIcon && (
            <div className="dropdown relative" onClick={toggleDropdown} ref={dropdownRef}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" className="bi bi-plus w-6 h-6 mr-2" viewBox="0 0 24 24">
                <path d="M11 5h2v14h-2z" />
                <path d="M5 11h14v2H5z" />
              </svg>
              <div className={`dropdown-menu ${showDropdown ? 'block' : 'hidden'} absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg`}>
                <div className="dropdown-item py-2 px-4 cursor-pointer" onClick={() => window.location.href = '/Create'}>Create Classroom</div>
                <div className="dropdown-item py-2 px-4 cursor-pointer" onClick={() => window.location.href = '/join'}>Join Classroom</div>
              </div>
            </div>
          )}
          {isAuthenticated && (
            <div className="dropdown relative" onClick={toggleUserDropdown} ref={userDropdownRef}>
              <img src={user.picture} alt={user.name} className="avatar w-8 h-8 rounded-full cursor-pointer ml-2" />
              <div className={`dropdown-menu ${showUserDropdown ? 'block' : 'hidden'} absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg`}>
                {/* <div className="dropdown-item py-2 px-4 cursor-pointer">Profile</div>
                <div className="dropdown-item py-2 px-4 cursor-pointer">Settings</div> */}
                <div className="dropdown-item py-2 px-4 cursor-pointer" onClick={() => logout({ returnTo: window.location.origin })}>Logout</div>
              </div>
            </div>
          )}
        </div>
      </nav>

      { !  isAuthenticated && (
      <body className="font-sans " style={{ backgroundColor: 'antiquewhite' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-screen h-dvh">
          <div className="flex flex-col md:flex-row items-center justify-between py-8">
            <div className="md:w-1/2 text-center ">
              <h1 className="text-4xl font-bold text-black-800 mb-4  animate-slide-in-up ">Generate <span className='text-blue-700'>quizzes</span> from any text in one click using AI.</h1>
              <h1 className="text-3xl text-black-700 font-bold mb-2 animate-fade-in" >For <span className='text-blue-700' style={{ animationDuration: `${forTexts.length}s`, animationIterationCount: 'infinite', animationName: 'moveFromBottom' }}>{`${forTexts[forTextIndex]}`}</span></h1>
              <p className="text-zinc-600 mb-6 font-semibold">Supports high-volume quiz generation  from Text in 1-click!</p>
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out" onClick={loginWithRedirect}>
                Login to get started →
              </button>
              <p className="text-sm text-zinc-500 mt-4 items-center font-bold">Easiest Way to Create and Assign Quizzes</p>
            </div>
            <div className="md:w-2/5 mt-8 md:mt-0">
              <div className="p-6 border-2 border-purple-300 rounded-lg shadow-lg flex justify-center">
                <img src={Hero} alt="AI Illustration" className="w-full h-medium" />
              </div>
            </div>
            
          </div>
        </div>
      </body>
      )}
    </div>



  );
}

export default HomePage;


const styles = `

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
   100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-in-out;
}

@keyframes moveFromBottom {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

`

const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(styles));
document.head.appendChild(styleElement);


console.log("Style Element:", styleElement);
console.log("Animations Applied:", styleElement.sheet.cssRules);