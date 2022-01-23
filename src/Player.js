import { useState, useEffect } from "react";
import Hand from "./Hand.js";

export default function Player(props) {
  const { calcScore, hand } = props;

  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(calcScore(hand));
  }, [hand, calcScore]);

  return (
    <div>
      Your Hand:
      <Hand hand={props.hand} />
      Score: {score}
    </div>
  );
}
