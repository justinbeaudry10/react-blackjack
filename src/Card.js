import React from "react";

export default function Card(props) {
  return <img alt={props.name} src={props.path} className="card" />;
}
