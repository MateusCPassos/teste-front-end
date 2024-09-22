import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Button, Container, Localizacao } from "./style";
import axios from "axios";

function Index() {


  const [estados, setEstados] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidades, setCidades] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [clima, setClima] = useState(null);
  const [error, setError] = useState(null);

  //busca estados do Brasil pela api do IBGE

  useEffect(() => {
    const fetchEstados = async () => {
      const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      setEstados(response.data);
    };
    fetchEstados();
  }, []);

  //busca a cidades do Brasil com base nos estados escolhido pelo usuario

  useEffect(() => {
    if (estadoSelecionado) {
      const fetchCidades = async () => {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`);
        setCidades(response.data);
      };
      fetchCidades();
    }
  }, [estadoSelecionado]);


  //constante para buscar o clima quando a cidade e estados forem selecionados 
  const buscarClima = async () => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=d3eadc9171be4f6f920162823242009&q=${cidadeSelecionada},${estadoSelecionado},Brazil`);
      setClima(response.data);
      setError(null);
    } catch (error) {
      setError('Não foi possível buscar as informações climáticas de sua cidade.');
      setClima(null);
    }
  };

  return (
    <Container>
      <Header />
      <Localizacao>Informe seu estado e sua cidade</Localizacao>

      {/*selecionar o estado */}
      <select
        value={estadoSelecionado}
        onChange={(e) => setEstadoSelecionado(e.target.value)}
      >
        <option value="">Selecione um estado</option>
        {estados.map((estado) => (
          <option key={estado.id} value={estado.id}>
            {estado.nome}
          </option>
        ))}
      </select>

      {/*selecionar a cidade */}
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

      {/* Botão para buscar*/}
      {cidadeSelecionada && (
        <button onClick={buscarClima}>Buscar Clima</button>
      )}

      {/* exebir informações do clima*/}

      




    </Container>
  );
}

export default Index;