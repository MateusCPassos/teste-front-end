import styled from 'styled-components';

export const Container = styled.div`

`;

export const Localizacao = styled.h1`
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; 
  margin-bottom: 20px;

  select {
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 200px;
  }
`;


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; 
`;


export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  text-align: center

  &:hover {
    background-color: #45a049;
    color: #ffffff;
  }
`;

export const SelectCity = styled.h2`
  text-align: center;
  font-size: 25px;
  margin-top: 20px;
`;

export const ClimaInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center;

  img {
    width: 170px;
    margin-right: 15px;
  }

  p {
    margin: 5px 0;
    font-size: 30px;
  }
`;

export const TextoDetalhes = styled.h4`
    text-align: center;
    font-size: 30px;

`;

export const DetalhesClima = styled.div`
  margin-top: 30px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #ddd;

  .infornacoes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Ajuste o valor aqui se necessário */
    gap: 20px;

    div {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid #ccc;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
      }
    }

    h3 {
      font-size: 22px;
      color: #333;
      margin-bottom: 10px;
    }

    p {
      font-size: 18px;
      color: #555;
      margin: 0;
      font-weight: 500;
    }

    svg {
      margin-right: 8px;
      color: #0073e6;
      font-size: 22px;
    }
  }
`;


export const PrevisaoProximosDias = styled.h4`
    text-align: center;
    font-size: 30px;
`;
export const PrevisaoContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex; /* Usar flexbox */
  flex-wrap: wrap; 
  justify-content: space-around;
`;

export const DiaCard = styled.div`
 background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  width: 150px; 
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 40px; 
    height: auto;
  }

  h4 {
    font-size: 16px;
    margin: 5px 0;
  }

  p {
    margin: 5px 0;
    font-size: 14px; 
    color: #555;
  }
`;


