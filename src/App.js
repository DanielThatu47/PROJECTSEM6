import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
// import { ProgressBar } from 'react-bootstrap';

import HomePage from './Components/HomePage.jsx';
import Classroom from './Components/Classroom.jsx';
import Create from './Components/Create.jsx';
import QuizGenerator from './Components/QuizGenerator.jsx';
import UnauthorizedPage from './Components/UnauthorizedPage.jsx';
import Quizzes from './Components/Quizzes.jsx';
import Join from './Components/Join.jsx';
import ClassroomInterface from './Components/ClassroomInterface.jsx';
import Userclass from './Components/Userclass.jsx';
import Quiz from './Components/Quiz.jsx';
import Results from './Components/Results.jsx';

const App = () => {
  const { isAuthenticated} = useAuth0();


  return (
    <Router>
      <Routes>
      <Route path='/unauthorized' element={!isAuthenticated ? <HomePage/>:<Navigate to= "/Classroom"/>}/>
        <Route path="/" element={<Classroom /> } />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        {isAuthenticated &&(
          <>
            <Route path="/generate/:code" element={<QuizGenerator />} />
            <Route path="/Classroom" element={<Classroom />} />
            <Route path="/Create" element={<Create/>} />
            <Route path="/quizzes/:code" element={<Quizzes/>} />
            <Route path='/join'element={<Join/>}/>
            <Route path='/class/:code'element={<ClassroomInterface/>}/>
            <Route path='/class/:code/:heading'element={<ClassroomInterface/>}/>

            <Route path='/userclass'element={<Userclass/>}/>
            <Route path='/'element={<Userclass/>}/>
            <Route path='/quiz/:code/:heading'element={<Quiz/>}/>
            <Route path = '/results/:code/:heading' element={<Results/>}/>



          </>
        )
        
        }
      </Routes>
    </Router>
  );
};

const domain = "dev-147umiv5h85hvjw1.us.auth0.com";
const clientId = "FH2Q3oyoJZfKm1NbPBrWhH4PGs5BlnlE";

const AppWithAuth0 = () => (
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);

export default AppWithAuth0;
