import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Button, Container, Localizacao, SelectCity, ClimaInfo,
DetalhesClima, FormGroup, ButtonContainer, TextoDetalhes, PrevisaoProximosDias, 
PrevisaoContainer, DiaCard, Map } from "./style";
import axios from "axios";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { CiCloud, CiDroplet } from "react-icons/ci";
import { IoRainyOutline, IoSunnyOutline } from "react-icons/io5";
import { FiSunrise } from "react-icons/fi";
import { LuSunset } from "react-icons/lu";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

function Index() {
  const [estados, setEstados] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidades, setCidades] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [clima, setClima] = useState(null);
  const [error, setError] = useState(null);

  // Chave da API do Google Maps
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDsXApkaOhOa-FrgTeEB8zbSOtb2Su9CVc'
  });

  useEffect(() => {
    const fetchEstados = async () => {
      const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      setEstados(response.data);
    };
    fetchEstados();
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      const fetchCidades = async () => {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`);
        setCidades(response.data);
      };
      fetchCidades();
    }
  }, [estadoSelecionado]);

  const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const buscarClima = async () => {
    try {
      const cidadeCodificada = encodeURIComponent(removerAcentos(cidadeSelecionada));
      const estadoCodificado = encodeURIComponent(estadoSelecionado);
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=d3eadc9171be4f6f920162823242009&q=${cidadeCodificada},${estadoCodificado},Brazil&days=5`);

      if (response.data.location.name.toLowerCase() === removerAcentos(cidadeSelecionada.toLowerCase())) {
        setClima(response.data);
        setError(null);
      } else {
        setError('Cidade não encontrada. Tente outra.');
        setClima(null);
      }
    } catch (error) {
      setError('Não foi possível buscar as informações climáticas de sua cidade.');
      setClima(null);
    }
  };

  return (
    <Container>
      <Header />
      <Localizacao>Informe seu estado e sua cidade</Localizacao>

      <FormGroup>
        <select value={estadoSelecionado} onChange={(e) => setEstadoSelecionado(e.target.value)}>
          <option value="">Selecione um estado</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.sigla}>
              {estado.nome}
            </option>
          ))}
        </select>

        {estadoSelecionado && (
          <select value={cidadeSelecionada} onChange={(e) => setCidadeSelecionada(e.target.value)}>
            <option value="">Selecione uma cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </option>
            ))}
          </select>
        )}
      </FormGroup>

      <ButtonContainer>
        {cidadeSelecionada && (
          <Button onClick={buscarClima}>Buscar Clima</Button>
        )}
      </ButtonContainer>

      {clima && (
        <SelectCity>
          {clima.location.name}, {clima.location.region}
        </SelectCity>
      )}

      {clima && (
        <>
          <ClimaInfo>
            <img src={clima.current.condition.icon} alt={clima.current.condition.text} />
            <div>
              <p>Condição: {clima.current.condition.text}</p>
              <p>Temperatura Atual: {clima.current.temp_c} °C</p>
            </div>
          </ClimaInfo>
          <TextoDetalhes>detalhes do clima</TextoDetalhes>
          <DetalhesClima>
            <div className="infornacoes">
              <div className="temperatura">
                <h3>Temperatura</h3>
                <p>Min: <FaLongArrowAltDown /> {clima.forecast.forecastday[0].day.mintemp_c} °C</p>
                <p>Max: <FaLongArrowAltUp /> {clima.forecast.forecastday[0].day.maxtemp_c} °C</p>
              </div>
              <div className="umidade">
                <h3>Umidade do Ar</h3>
                <p><CiDroplet /> {clima.current.humidity}%</p>
              </div>
              <div className="precipitacao">
                <h3>Precipitação</h3>
                <p><IoRainyOutline /> {clima.forecast.forecastday[0].day.totalprecip_mm} mm</p>
              </div>
              <div className="nuvens">
                <h3>Nuvens</h3>
                <p><CiCloud /> {clima.current.cloud}%</p>
              </div>
              <div className="indiceUv">
                <h3>Índice UV</h3>
                <p><IoSunnyOutline /> {clima.current.uv}%</p>
              </div>
              <div className="nascerSol">
                <h3>Nascer do Sol</h3>
                <p><FiSunrise /> {clima.forecast.forecastday[0].astro.sunrise}</p>
              </div>
              <div className="porSol">
                <h3>Por do Sol</h3>
                <p><LuSunset /> {clima.forecast.forecastday[0].astro.sunset}</p>
              </div>
            </div>
          </DetalhesClima>

          <PrevisaoProximosDias>Previsão dos Próximos Dias</PrevisaoProximosDias>
          <PrevisaoContainer>
            {clima.forecast.forecastday.map((dia) => (
              <DiaCard key={dia.date}>
                <img src={dia.day.condition.icon} alt={dia.day.condition.text} />
                <h4>{dia.date}</h4>
                <p>Condição: {dia.day.condition.text}</p>
                <p>Min: {dia.day.mintemp_c} °C</p>
                <p>Max: {dia.day.maxtemp_c} °C</p>
                <p>Precipitação: {dia.day.totalprecip_mm} mm</p>
              </DiaCard>
            ))}
          </PrevisaoContainer>

          {clima && clima.location.lat && clima.location.lon && isLoaded && (
            <Map>
            <GoogleMap
              mapContainerStyle={{ width: '50%', height: '400px' }}
              center={{ lat: clima.location.lat, lng: clima.location.lon }}
              zoom={10}
            >
              <Marker position={{ lat: clima.location.lat, lng: clima.location.lon }} />
            </GoogleMap>
            </Map>
          )}
        </>
      )}

      {error && <p>{error}</p>}
    </Container>
  );
}

export default Index;
