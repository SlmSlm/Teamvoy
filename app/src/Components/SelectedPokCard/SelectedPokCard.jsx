import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

const SelectedPokCard = (props) => {
  return (
    <div>
      <Card bg={"dark"} style={{ position: "fixed", textAlign: "center" }}>
        <Card.Img src={props.state.img} style={{ width: "150px" }} />
        <Card.Title>
          {props.handleString(props.state.name)} # {props.state.id}
        </Card.Title>
        <Table striped bordered hover variant="dark">
          <tbody>
            <tr>
              <td>Type</td>
              <td>
                {props.state.types.map((types) => (
                  <div
                    style={{ marginBottom: "5px" }}
                    onClick={() => props.sortByType(types.type.name)}
                  >
                    {props.handleString(types.type.name)}
                  </div>
                ))}
              </td>
            </tr>
            <tr>
              <td>Attack</td>
              <td>{props.state.attack}</td>
            </tr>
            <tr>
              <td>Defense</td>
              <td>{props.state.defence}</td>
            </tr>
            <tr>
              <td>HP</td>
              <td>{props.state.hp}</td>
            </tr>
            <tr>
              <td>SP Attack</td>
              <td>{props.state.spattack}</td>
            </tr>
            <tr>
              <td>SP Defense</td>
              <td>{props.state.spdefence}</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{props.state.speed}</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>{props.state.weight}</td>
            </tr>
            <tr>
              <td>Total moves</td>
              <td>{props.state.totalMoves}</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default SelectedPokCard;
