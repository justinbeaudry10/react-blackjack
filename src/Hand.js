import React from "react";
import Card from "./Card.js";

export default function Hand(props) {
  return props.hand.map((card) => {
    let path = `img/${card}.png`;
    return <Card key={card} name={card} path={path} />;
  });
}
