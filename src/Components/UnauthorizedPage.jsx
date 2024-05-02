import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const UnauthorizedPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Oops! You have not logged in. 😕</h1>
      <Button variant="primary" onClick={() => loginWithRedirect()}>Login with Auth0</Button>
    </div>
  );
};

export default UnauthorizedPage;
