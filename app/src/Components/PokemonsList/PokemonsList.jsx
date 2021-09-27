import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import SelectedPokCard from "../SelectedPokCard/SelectedPokCard";
import styles from "./PokemonsList.module.css";
import Preloader from "../Preloader/Preloader";

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
      <SelectedPokCard state={selectedPokData} handleString={handleString} />
    );

  const handleString = (str) => {
    switch (str) {
      case "grass":
        return (
          <span style={{ "background-color": "green", padding: "3px" }}>
            {str[0].toUpperCase() + str.slice(1) + " "}
          </span>
        );
      case "fire":
        return (
          <span style={{ "background-color": "red", padding: "3px" }}>
            {str[0].toUpperCase() + str.slice(1) + " "}
          </span>
        );
      case "poison":
        return (
          <span style={{ "background-color": "violet", padding: "3px" }}>
            {str[0].toUpperCase() + str.slice(1) + " "}
          </span>
        );
      case "electric":
        return (
          <span style={{ "background-color": "yellow", padding: "3px" }}>
            {str[0].toUpperCase() + str.slice(1) + " "}
          </span>
        );
      case "water":
        return (
          <span style={{ "background-color": "blue", padding: "3px" }}>
            {str[0].toUpperCase() + str.slice(1) + " "}
          </span>
        );
      case "bug":
        return (
          <span style={{ "background-color": "brown", padding: "3px" }}>
            {str[0].toUpperCase() + str.slice(1) + " "}
          </span>
        );
      case "flying":
        return (
          <span style={{ "background-color": "#7FC7FF", padding: "3px" }}>
            {str[0].toUpperCase() + str.slice(1) + " "}
          </span>
        );
      case "fairy":
        return (
          <span style={{ "background-color": "pink", padding: "3px" }}>
            {str[0].toUpperCase() + str.slice(1) + " "}
          </span>
        );
      case "fighting":
        return (
          <span style={{ "background-color": "#7FC7FF", padding: "3px" }}>
            {str[0].toUpperCase() + str.slice(1) + " "}
          </span>
        );
      default:
        return str[0].toUpperCase() + str.slice(1) + " ";
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            {props.preloader ? (
              <Preloader />
            ) : (
              <div>
                <Row>
                  {props.pokemons.map((p) => {
                    return (
                      <Col key={p.id} xs={12} sm={6} md={4} lg={4}>
                        <Card
                          bg={"dark"}
                          onClick={() => getData(p)}
                          className={styles.card}
                        >
                          <Card.Body>
                            <Card.Img
                              src={p.sprites.front_default}
                              alt="Pokemon"
                              style={{ width: "150px" }}
                            />
                            <Card.Title>{handleString(p.name)}</Card.Title>
                            {p.types.map((types) => (
                              <span className={styles.types}>
                                {handleString(types.type.name)}
                              </span>
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
              </div>
            )}
          </Col>
          <Col>{checkState(selectedPokData)}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default PokemonsList;
