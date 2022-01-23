import { useState, useEffect } from "react";
import Player from "./Player.js";
import Dealer from "./Dealer.js";
import "./style.css";

function Blackjack() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

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

    setPlayerHand(player);
    setDealerHand(dealer);
    setDeck(curDeck);
  }

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
      for (let c of hand) {
        if (c.charAt(0) === "A") {
          c = "1" + c.slice(1);
          curScore -= 10;
          break;
        }
      }
    }

    return curScore;
  }

  function hit() {
    let curDeck = deck;
    let curPlayerHand = playerHand;

    let randIndex = Math.trunc(Math.random() * curDeck.length);
    let card = curDeck[randIndex];
    curDeck.splice(randIndex, 1);

    curPlayerHand.push(card);

    setDeck(curDeck);
    setPlayerHand(curPlayerHand);
  }

  return (
    <>
      <button onClick={deal}>Deal</button>
      <button onClick={hit}>Hit</button>
      <button>Stand</button>
    </>
  );
}

export default Blackjack;
