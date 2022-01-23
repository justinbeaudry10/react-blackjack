import { useState, useEffect } from "react";
import Hand from "./Hand.js";

export default function Dealer(props) {
  const [score, setScore] = useState(0);

  return (
    <div>
      Dealer:
      <Hand hand={props.hand} />
    </div>
  );
}
