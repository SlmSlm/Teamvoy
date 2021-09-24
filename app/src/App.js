import * as axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "./App.css";
import PokemonsList from "./Components/PokemonsList";

function App() {
  function loadMore() {
    getPokemons();
  }

  let [currentLimit, setLimit] = useState(12);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsId, setId] = useState([]);

  const getPokemons = async () => {
    let array = [];
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${currentLimit}`)
      .then((res) => {
        res.data.results.map((p) => {
          return axios
            .get(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
            .then((resp) => {
              return (
                array.push(resp.data),
                setPokemons(array.sort((a, b) => a.id - b.id)),
                setId(resp.data.id)
              );
            });
        });
        setLimit((currentLimit += 12));
      });
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div>
      <div>
        <h1>Pokedex</h1>
      </div>
      <PokemonsList pokemons={pokemons} loadMore={loadMore} />
    </div>
  );
}

export default App;
