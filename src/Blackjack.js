import { useState, useEffect, useRef } from "react";
import Hand from "./Hand.js";
import "./style.css";

const LOCAL_STORAGE_KEY = "blackjack.credits";

function Blackjack() {
  const [result, setResult] = useState("");
  const [deck, setDeck] = useState([]);
  const [credits, setCredits] = useState(10);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  const playerRef = useRef();
  const dealerRef = useRef();
  const creditsRef = useRef();
  playerRef.current = playerScore;
  dealerRef.current = dealerScore;
  creditsRef.current = credits;

  const checkResult = useRef((stand = false) => {
    let newCredits = creditsRef.current;
    console.log(newCredits);

    if (playerRef.current > 21) {
      setResult("Bust");
    }

    if (stand) {
      if (playerRef.current > dealerRef.current || dealerRef.current > 21) {
        newCredits += 2;
        setCredits(newCredits);
        setResult("You Won!");
      } else if (playerRef.current === dealerRef.current) {
        setCredits(++newCredits);
        setResult("Push");
      } else {
        setResult("You Lost");
      }
    }
  });

  useEffect(() => {
    const storedCredits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedCredits) setCredits(storedCredits);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(credits));
  }, [credits]);

  useEffect(() => {
    let curScore = calcScore(playerHand);

    setPlayerScore(curScore);
  }, [playerHand]);

  useEffect(() => {
    if (playerScore === 0) return;
    checkResult.current();
  }, [playerScore]);

  useEffect(() => {
    if (dealerScore === 0) return;
    checkResult.current(true);
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

  function deal() {
    let newCredits = credits;

    if (newCredits <= 0) {
      setResult("Out of credits!");
      return;
    }
    setCredits(--newCredits);

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
  }

  function stand() {
    dealerHit();
  }

  function addCredits() {
    setCredits(10);
    setResult("Credits added!");
  }

  return (
    <>
      <div className="board">
        <label id="credits">Credits: {credits}</label>
        <div className="hand">
          <Hand status={result} hand={dealerHand} />
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
        {credits === 0 && result === "Out of credits!" ? (
          <button key="addCredits" onClick={addCredits}>
            Add Credits
          </button>
        ) : null}
        <label>Current Score: {playerScore}</label>
        <div className="hand">
          <Hand hand={playerHand} />
        </div>
      </div>
    </>
  );
}

export default Blackjack;
