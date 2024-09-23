import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Button, Container, Localizacao, SelectCity, ClimaInfo, DetalhesClima, SelecionarCidade, FormGroup, ButtonContainer, TextoDetalhes, PrevisaoProximosDias, PrevisaoContainer, DiaCard } from "./style";
import axios from "axios";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { CiCloud, CiDroplet } from "react-icons/ci";
import { IoRainyOutline, IoSunnyOutline } from "react-icons/io5";
import { FiSunrise } from "react-icons/fi";
import { LuSunset } from "react-icons/lu";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

function Index() {
  const [estados, setEstados] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidades, setCidades] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [clima, setClima] = useState(null);
  const [error, setError] = useState(null);

  // Busca estados do Brasil
  useEffect(() => {
    const fetchEstados = async () => {
      const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      setEstados(response.data);
    };
    fetchEstados();
  }, []);

  // Busca cidades do Brasil com base no estado selecionado
  useEffect(() => {
    if (estadoSelecionado) {
      const fetchCidades = async () => {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`);
        setCidades(response.data);
      };
      fetchCidades();
    }
  }, [estadoSelecionado]);

  // Função para remover acentos e caracteres especiais
  const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Busca clima com base na cidade e estado selecionados
  const buscarClima = async () => {
    try {
      const cidadeCodificada = encodeURIComponent(removerAcentos(cidadeSelecionada));
      const estadoCodificado = encodeURIComponent(estadoSelecionado);
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=d3eadc9171be4f6f920162823242009&q=${cidadeCodificada},${estadoCodificado},Brazil&days=5`); // Alterado para 5 dias

      // Verifica se a cidade retornada é válida
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

      {/* Selecionar o estado */}
      <FormGroup>
        <select
          value={estadoSelecionado}
          onChange={(e) => setEstadoSelecionado(e.target.value)}
        >
          <option value="">Selecione um estado</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.sigla}>
              {estado.nome}
            </option>
          ))}
        </select>

        {/* Selecionar a cidade */}
        {estadoSelecionado && (
          <select
            value={cidadeSelecionada}
            onChange={(e) => setCidadeSelecionada(e.target.value)}
          >
            <option value="">Selecione uma cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </option>
            ))}
          </select>
        )}
      </FormGroup>

      {/* Botão para buscar */}
      <ButtonContainer>
        {cidadeSelecionada && (
          <Button onClick={buscarClima}>Buscar Clima</Button>
        )}
      </ButtonContainer>

      {/* Exibir cidade buscada */}
      {clima && (
        <SelectCity>
          {clima.location.name}, {clima.location.region}
        </SelectCity>
      )}

      {/* Exibir detalhes do clima */}
      {clima && (
        <>
          <ClimaInfo>
            <img src={clima.current.condition.icon} alt={clima.current.condition.text} />
            <div>
              <p>Condição: {clima.current.condition.text}</p>
              <p>Temperatura Atual: {clima.current.temp_c} °C</p>
            </div>
          </ClimaInfo>
          <TextoDetalhes>
            detalhes do clima
          </TextoDetalhes>
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


          {/* Exibir previsão dos próximos dias */}
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

          {/* Exibir mapa */}
          {clima.location.lat && clima.location.lon && (
            <MapContainer
              center={[clima.location.lat, clima.location.lon]}
              zoom={10}
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[clima.location.lat, clima.location.lon]} icon={customIcon}>
                <Popup>
                  {clima.location.name}
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </>
      )}

      {/* Exibir mensagem de erro */}
      {error && <p>{error}</p>}
    </Container>
  );
}

export default Index;
