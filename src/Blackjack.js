import { useState, useEffect } from "react";
import Hand from "./Hand.js";
import "./style.css";

function Blackjack() {
  const [result, setResult] = useState("");
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  useEffect(() => {
    let curScore = calcScore(playerHand);

    setPlayerScore(curScore);
  }, [playerHand]);

  useEffect(() => {
    if (playerScore === 0) return;
    checkResult();
  }, [playerScore]);

  useEffect(() => {
    if (dealerScore === 0) return;
    checkResult(true);
  }, [dealerScore]);

  function calcScore(hand) {
    let curScore = 0;

    hand.forEach((card) => {
      if (card.charAt(0) === "A") {
        curScore += 11;
      } else if (
        card.charAt(0) === "J" ||
        card.charAt(0) === "Q" ||
        card.charAt(0) === "K" ||
        card.slice(0, 2) === "10"
      ) {
        curScore += 10;
      } else {
        curScore += Number(card.charAt(0));
      }
    });

    if (curScore > 21) {
      // First checks if there are any aces, and changes their value from 11 to 1
      for (let c of hand) {
        if (c.charAt(0) === "A") {
          c = "1" + c.slice(1);
          curScore -= 10;
          if (curScore <= 21) break;
        }
      }
    }

    return curScore;
  }

  function resetDeck() {
    const suits = ["S", "H", "C", "D"];
    const values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    let newDeck = [];

    for (let s of suits) {
      for (let v of values) {
        newDeck.push(v + s);
      }
    }

    setDeck(newDeck);

    return newDeck;
  }

  function checkResult(stand = false) {
    if (playerScore > 21) {
      setResult("Bust");
    }

    if (stand) {
      if (playerScore > dealerScore || dealerScore > 21) {
        setResult("You Won!");
      } else if (playerScore === dealerScore) {
        setResult("Push");
      } else {
        setResult("You Lost");
      }
    }
  }

  function deal() {
    let curDeck = resetDeck();

    let player = [];
    let dealer = [];

    for (let i = 0; i < 4; i++) {
      let randIndex = Math.trunc(Math.random() * curDeck.length);
      let card = curDeck[randIndex];
      curDeck.splice(randIndex, 1);
      if (i < 2) player.push(card);
      else dealer.push(card);
    }

    setResult("In progress");
    setPlayerHand(player);
    setDealerHand(dealer);
    setPlayerScore(0);
    setDealerScore(0);
    setDeck(curDeck);
  }

  function hit() {
    let curDeck = [...deck];
    let curPlayerHand = [...playerHand];

    let randIndex = Math.trunc(Math.random() * curDeck.length);
    let card = curDeck[randIndex];
    curDeck.splice(randIndex, 1);

    curPlayerHand.push(card);

    setDeck(curDeck);
    setPlayerHand(curPlayerHand);
  }

  function dealerHit() {
    let curDeck = [...deck];
    let curDealerHand = [...dealerHand];
    let curDealerScore = calcScore(curDealerHand);

    while (curDealerScore < 17) {
      let randIndex = Math.trunc(Math.random() * curDeck.length);
      let card = curDeck[randIndex];
      curDeck.splice(randIndex, 1);

      curDealerHand.push(card);

      setDeck(curDeck);
      setDealerHand(curDealerHand);

      curDealerScore = calcScore(curDealerHand);
    }

    setDealerScore(curDealerScore);
    console.log(curDealerScore);
  }

  function stand() {
    dealerHit();
  }

  return (
    <>
      <div className="board">
        <div className="hand">
          <Hand hand={dealerHand} />
        </div>
        <div>
          {result === "In progress" ? (
            [
              <button key="hit" onClick={hit}>
                Hit
              </button>,
              <button key="stand" onClick={stand}>
                Stand
              </button>,
            ]
          ) : (
            <button onClick={deal}>Deal</button>
          )}
        </div>
        {result === "In progress" ? null : <label>{result}</label>}
        <label>Current Score: {playerScore}</label>
        <div className="hand">
          <Hand hand={playerHand} />
        </div>
      </div>
    </>
  );
}

export default Blackjack;
