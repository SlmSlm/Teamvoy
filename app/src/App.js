import * as axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./App.css";

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
    <div className={"main"}>
      <div>Pokedex</div>
      <Container>
        <Row>
          <Col>
            <Row>
              {pokemons.map((p) => {
                return (
                  <Col key={p.id} xs={12} sm={6} md={4} lg={2}>
                    <Card>
                      <Card.Body>
                        <Card.Img src={p.sprites.front_default} alt="Pokemon" />
                        <Card.Title>{p.name}</Card.Title>
                        {p.types.map((types) => (
                          <div> {types.type.name} </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <Button onClick={loadMore} style={{ width: "100%" }}>
              Load more
            </Button>
          </Col>
          <Col>Content</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
