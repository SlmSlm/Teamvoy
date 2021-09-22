import "./App.css";
import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import * as axios from "axios";

function App() {
  function loadMore() {
   getPokemons();
  }
  const [pokemon, setPokemon] = useState([]);
  let [currentLimit, setLimit] = useState(12);

  const getPokemons = async () => {
    return await axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${currentLimit}`)
      .then((res) => {
        setPokemon(res.data.results.map((p) => p.name));
        setLimit(currentLimit += 12);
      });
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div>
      <PokemonList pokemon={pokemon} />
      <button onClick={loadMore}>Load more</button>
    </div>
  );
}

export default App;
