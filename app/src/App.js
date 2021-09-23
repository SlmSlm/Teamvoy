import "./App.css";
import React, { useState, useEffect } from "react";
import * as axios from "axios";

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
                array.push(resp.data), setPokemons(array), setId(resp.data.id)
                // console.log(pokemonsId)
              );
            });
        });
        setLimit((currentLimit += 12));
      });
    // console.log(pokemons)
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div>
      {pokemons.map((p) => {
        // console.log(pokemons);
        // console.log(p);
        return (
          <div key={p.id}>
            <div>
              {p.name}
              <img src={p.sprites.front_default} alt="Pokemon" />
              {p.types.map((types) => (
                <div> {types.type.name} </div>
              ))}
            </div>
          </div>
        );
      })}
      <button onClick={loadMore}>Load more</button>
    </div>
  );
}

export default App;
