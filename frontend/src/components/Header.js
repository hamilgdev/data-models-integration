import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  const [isAuthenthicated, setIsAuthenthicated] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsAuthenthicated(true);
    } else {
      setIsAuthenthicated(false);
    }
  }, []);
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ML Store</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {!isAuthenthicated && (
                <LinkContainer to='/auth/sign-in'>
                  <Nav.Link>Inicia sesión</Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to='/about'>
                <Nav.Link>Acerca de</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
