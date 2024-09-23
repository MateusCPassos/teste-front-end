import React, { useEffect, useState } from 'react';
import { Card, Title, Text } from './style';

const CapitalCard = ({ city, country }) => {
    const [temperature, setTemperature] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Função para buscar os dados da temperatura
        const fetchWeatherData = async () => {
            const cidadeCodificada = encodeURIComponent(city);
            const apiKey = 'd3eadc9171be4f6f920162823242009';
            const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cidadeCodificada},Brazil&days=1`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setTemperature(data.current.temp_c);
                setCurrentTime(data.location.localtime); 
            } catch (error) {
                console.error('Erro ao buscar dados do clima:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city]); 

    return (
        <Card>
        <Title>{city}, {country}</Title>
            <>
                <Text>Temperatura: {temperature ? `${temperature} °C` : 'Dados indisponíveis'}</Text>
                <Text>Horário: {currentTime ? currentTime : 'Dados indisponíveis'}</Text>
            </>
    </Card>
    );
};

export default CapitalCard;
