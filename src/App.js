import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import 'ldrs/ring'; // Import the LDRS ring loader

// Lazy load components
const HomePage = lazy(() => import('./Components/HomePage.jsx'));
const Classroom = lazy(() => import('./Components/Classroom.jsx'));
const Create = lazy(() => import('./Components/Create.jsx'));
const QuizGenerator = lazy(() => import('./Components/QuizGenerator.jsx'));
const UnauthorizedPage = lazy(() => import('./Components/UnauthorizedPage.jsx'));
const Quizzes = lazy(() => import('./Components/Quizzes.jsx'));
const Join = lazy(() => import('./Components/Join.jsx'));
const ClassroomInterface = lazy(() => import('./Components/ClassroomInterface.jsx'));
const Userclass = lazy(() => import('./Components/Userclass.jsx'));
const Quiz = lazy(() => import('./Components/Quiz.jsx'));
const Results = lazy(() => import('./Components/Results.jsx'));

// Loader component using LDRS
const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <l-ring size="60" color="coral"></l-ring>
  </div>
);

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Render the Loader during Auth0's loading state
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/unauthorized" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          {isAuthenticated && (
            <>
              <Route path="/generate/:code" element={<QuizGenerator />} />
              <Route path="/Classroom" element={<Classroom />} />
              <Route path="/Create" element={<Create />} />
              <Route path="/quizzes/:code" element={<Quizzes />} />
              <Route path="/join" element={<Join />} />
              <Route path="/class/:code" element={<ClassroomInterface />} />
              <Route path="/class/:code/:heading" element={<ClassroomInterface />} />
              <Route path="/userclass" element={<Userclass />} />
              <Route path="/" element={<Userclass />} />
              <Route path="/quiz/:code/:heading" element={<Quiz />} />
              <Route path="/results/:code/:heading" element={<Results />} />
            </>
          )}
        </Routes>
      </Suspense>
    </Router>
  );
};

const domain = "dev-147umiv5h85hvjw1.us.auth0.com";
const clientId = "FH2Q3oyoJZfKm1NbPBrWhH4PGs5BlnlE";

const AppWithAuth0 = () => (
  <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>
);

export default AppWithAuth0;