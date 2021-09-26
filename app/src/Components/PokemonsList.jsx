import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import SelectedPokCard from "./SelectedPokCard/SelectedPokCard";

const PokemonsList = (props) => {
  const [selectedPokData, setData] = useState({});

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
      selectedPokData,
      checkState(selectedPokData)
    );
  };

  const checkState = (state) =>
    Object.keys(state).length === 0 ? null : (
      <SelectedPokCard state={selectedPokData} toUpper={toUpper}/>
    );

  const toUpper = (str) => {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1) + " ";
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
                        <Card.Img
                          src={p.sprites.front_default}
                          alt="Pokemon"
                          style={{ width: "150px" }}
                        />
                        <Card.Title>{toUpper(p.name)}</Card.Title>
                        {p.types.map((types) => (
                          <span>{toUpper(types.type.name)}</span>
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
          <Col>{checkState(selectedPokData)}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default PokemonsList;
