import styled from 'styled-components';

export const Card = styled.div`
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.02);
    }
`;

export const Title = styled.h3`
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
`;

export const Text = styled.p`
    font-size: 18px;
    color: #555;
    margin: 5px 0;
`;
