import styled from 'styled-components';

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between; 
    align-items: center; 
     padding: 16px 40px;
    background-color: #98FB98;
    box-shadow: 0px 3px 10px #464646;
`;


export const Titulo = styled.h1`
    margin-right: 200px;
    
    a {
        color: #000;
        text-decoration: none;
    }

    a:hover {
        color: #fff;
    }
`;

export const Nav = styled.nav`
    ul {
        display: flex;  
        list-style: none;
        padding: 16px 40px;
        margin: 0;
        align-items: center; /
    }

    li {
        margin-left: 20px; 
    }

    a {
        color: #000;
        text-decoration: none;
        font-size: 16px;
    }

    a:hover {
        color: #fff; 
    }
`;