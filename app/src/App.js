import * as axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "./App.css";
import PokemonsList from "./Components/PokemonsList/PokemonsList";

function App() {
  function loadMore() {
    getPokemons();
  }

  function sortByType(type) {
    let sortedPokList = [];
    for (let i = 0; i < pokemons.length; i++) {
      let p = pokemons[i];
      for (let j = 0; j < p.types.length; j++) {
        let types = p.types[j];
        if (Object.keys(p.types).length > 1) {
          if (p.types[0].type.name === type || p.types[1].type.name === type) {
            sortedPokList.unshift(p);
            j++;
          } else {
            sortedPokList.push(p);
            j++;
          }
        } else if (types.type.name === type) {
          sortedPokList.unshift(p);
        } else {
          sortedPokList.push(p);
        }
      }
    }
    return setPokemons(sortedPokList);
  }

  let [currentLimit, setLimit] = useState(12);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsId, setId] = useState([]);
  const [preloader, togglrePreloader] = useState(false);

  const getPokemons = async () => {
    togglrePreloader(true);
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
        togglrePreloader(false);
        setLimit((currentLimit += 12));
      });
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div>
      <div style={{ textAlign: "center", margin: "20px" }}>
        <h1>Pokedex</h1>
        <div>To sort, please click on the type of pokemon</div>
      </div>
      <PokemonsList
        pokemons={pokemons}
        loadMore={loadMore}
        sortByType={sortByType}
        preloader={preloader}
      />
    </div>
  );
}

export default App;
