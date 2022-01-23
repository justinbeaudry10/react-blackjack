import React from "react";
import Card from "./Card.js";

export default function Hand(props) {
  return props.hand.map((card, i) => {
    let path = "";

    if (props.status === "In progress" && i === 1) {
      path = `img/card-back.png`;
    } else {
      path = `img/${card}.png`;
    }
    return <Card key={card} name={card} path={path} />;
  });
}
