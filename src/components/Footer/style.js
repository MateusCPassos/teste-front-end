import styled from "styled-components";

export const Footer = styled.footer`
    display: flex;
    justify-content: space-between; 
    align-items: center; 
    padding: 16px 40px;
    background-color: #98FB98;
    box-shadow: 0px 3px 10px #464646;

    @media (max-width: 768px) {
        flex-direction: column; 
        padding: 16px; 
    }
`;