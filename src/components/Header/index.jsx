import React from "react";

import { HeaderContainer, Nav, Titulo } from './style';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <HeaderContainer>
        <Titulo>
          <Link to="/">ClimaFácil</Link> 
        </Titulo>
        <Nav>
          <ul>
            <li className="nav-link">
              <Link to="/">Inicio</Link> 
            </li>
            <li className="nav-link">
              <Link to="/capitais">Capitais</Link>
            </li>
          </ul>
        </Nav>
      </HeaderContainer>

    );
}

export default Header;