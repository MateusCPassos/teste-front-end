import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Button, Container, Localizacao, SelectCity, ClimaInfo, DetalhesClima } from "./style"; 
import axios from "axios";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { CiCloud, CiDroplet } from "react-icons/ci";
import { IoRainyOutline, IoSunnyOutline } from "react-icons/io5";
import { FiSunrise } from "react-icons/fi";
import { LuSunset } from "react-icons/lu";

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
      <select
        value={estadoSelecionado}
        onChange={(e) => setEstadoSelecionado(e.target.value)}
      >
        <option value="">Selecione um estado</option>
        {estados.map((estado) => (
          <option key={estado.id} value={estado.sigla}> {/* Usando a sigla do estado */}
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

      {/* Botão para buscar */}
      {cidadeSelecionada && (
        <Button onClick={buscarClima}>Buscar Clima</Button>
      )}

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
          <DetalhesClima>
            <div className="infornacoes">
              <div className="tempUmid">
                <div className="temperatura">
                  <h3>Temperatura</h3>
                  <p>Min: <FaLongArrowAltDown /> {clima.forecast.forecastday[0].day.mintemp_c} °C</p>
                  <p>Max: <FaLongArrowAltUp /> {clima.forecast.forecastday[0].day.maxtemp_c} °C</p>
                </div>
                <div className="umidade">
                  <p>Umidade do ar: <CiDroplet />{clima.current.humidity}%</p>
                </div>
              </div>
              <div className="precipitacao">
                <p>Precipitação: <IoRainyOutline /> {clima.forecast.forecastday[0].day.totalprecip_mm} mm</p>
              </div>
              <div className="nuvens">
                <p>Nuvens: <CiCloud /> {clima.current.cloud}%</p>
              </div>
              <div className="indiceUv">
                <p>Índice UV: <IoSunnyOutline />{clima.current.uv}</p>
              </div>
              <div className="nascerSol">
                <p>Nascer do Sol: <FiSunrise />{clima.forecast.forecastday[0].astro.sunrise}</p>
              </div>
              <div className="porSol">
                <p>Por do Sol: <LuSunset />{clima.forecast.forecastday[0].astro.sunset}</p>
              </div>
            </div>
          </DetalhesClima>

          {/* Exibir previsão dos próximos dias */}
          <div>
            <h3>Previsão dos Próximos Dias</h3>
            {clima.forecast.forecastday.map((dia) => (
              
              <div key={dia.date}>
                <img src={clima.current.condition.icon} alt={clima.current.condition.text} />
                <h4>{dia.date}</h4>
                <p>Condição: {dia.day.condition.text}</p>
                <p>Min: {dia.day.mintemp_c} °C</p>
                <p>Max: {dia.day.maxtemp_c} °C</p>
                <p>Precipitação: {dia.day.totalprecip_mm} mm</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Exibir mensagem de erro */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Container>
  );
}

export default Index;
