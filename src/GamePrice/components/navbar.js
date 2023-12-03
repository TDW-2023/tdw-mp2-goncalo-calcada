// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10rem;
`;

const navButtonBase = `
  margin-top: 1%;
  margin-left: 2%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const NavButton = styled(NavLink)`
  ${navButtonBase}
  ${(props) => props.$isActive ? 'text-decoration: underline;' : ''}
`;

const Navbar = () => {
    const location = useLocation();

    return (
        <NavContainer>
            <NavButton to="/" $isActive={location.pathname === '/'}>
                Homepage
            </NavButton>
            <NavButton to="/Listcard" $isActive={location.pathname.startsWith('/Listcard')}>
                Games
            </NavButton>
        </NavContainer>
    );
};

export default Navbar;