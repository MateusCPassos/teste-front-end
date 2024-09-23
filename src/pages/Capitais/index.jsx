import React from "react";
import { Container, Title } from "./styles";
import CapitalCard from "../../components/CapitalCard";
import Header from "../../components/Header";

const capitais = [
    { city: 'Brasília', country: 'Brasil' },
    { city: 'Buenos Aires', country: 'Argentina' },
    { city: 'Lima', country: 'Peru' },
    { city: 'Lisboa', country: 'Portugal' },
    { city: 'Washington, D.C.', country: 'EUA' },
    { city: 'Paris', country: 'França' },
    { city: 'Moscou', country: 'Rússia' },
    { city: 'Seul', country: 'Coreia do Sul' },
    { city: 'Pequim', country: 'China' },
    { city: 'Berlim', country: 'Alemanha' },
    { city: 'Pretória', country: 'África do Sul' },
];

function Capitais() {
    return (
        <Container>
            <Header />
            <Title>Capitais</Title>
            {capitais.map(({ city, country }) => (
                <CapitalCard key={city} city={city} country={country} />
            ))}
        </Container>
    );
}

export default Capitais;
