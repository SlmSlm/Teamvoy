import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

const PokemonsList = (props) => {
  const [selectedPokData, setData] = useState({
    img: `https://www.film.ru/sites/default/files/images/10(186).jpg`,
    name: "Choose a Pokemon",
    id: null,
    types: [],
    attack: null,
    defence: null,
    hp: null,
    spattack: null,
    spdefence: null,
    speed: null,
    weight: null,
    totalMoves: null,
  });

  const getData = (p) => {
    return (
      setData({
        img: p.sprites.front_default,
        name: p.name,
        id: p.id,
        types: p.types,
        attack: p.stats[1].base_stat,
        defence: p.stats[2].base_stat,
        hp: p.stats[0].base_stat,
        spattack: p.stats[3].base_stat,
        spdefence: p.stats[4].base_stat,
        speed: p.stats[5].base_stat,
        weight: p.weight,
        totalMoves: p.moves.length,
      }),
      selectedPokData
    );
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Row>
              {props.pokemons.map((p) => {
                return (
                  <Col key={p.id} xs={12} sm={6} md={4} lg={4}>
                    <Card
                      bg={"dark"}
                      style={{ cursor: "pointer" }}
                      onClick={() => getData(p)}
                    >
                      <Card.Body>
                        <Card.Img src={p.sprites.front_default} alt="Pokemon" />
                        <Card.Title>{p.name}</Card.Title>
                        {p.types.map((types) => (
                          <span> {types.type.name} </span>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <Button onClick={props.loadMore} style={{ width: "100%" }}>
              Load more
            </Button>
          </Col>
          <Col>
            <Card bg={"dark"}>
              <Card.Img src={selectedPokData.img} />
              <Card.Title>
                {selectedPokData.name} {selectedPokData.id}
              </Card.Title>
              <Table striped bordered hover variant="dark">
                <tbody>
                  <tr>
                    <td>Type</td>
                    <td>
                      {selectedPokData.types.map((types) => (
                        <div>{types.type.name}</div>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td>Attack</td>
                    <td>{selectedPokData.attack}</td>
                  </tr>
                  <tr>
                    <td>Defense</td>
                    <td>{selectedPokData.defence}</td>
                  </tr>
                  <tr>
                    <td>HP</td>
                    <td>{selectedPokData.hp}</td>
                  </tr>
                  <tr>
                    <td>SP Attack</td>
                    <td>{selectedPokData.spattack}</td>
                  </tr>
                  <tr>
                    <td>SP Defense</td>
                    <td>{selectedPokData.spdefence}</td>
                  </tr>
                  <tr>
                    <td>Speed</td>
                    <td>{selectedPokData.speed}</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>{selectedPokData.weight}</td>
                  </tr>
                  <tr>
                    <td>Total moves</td>
                    <td>{selectedPokData.totalMoves}</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PokemonsList;
