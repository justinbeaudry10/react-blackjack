# Blackjack

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About

This is a front-end web application created using React functional components and hooks. It allows the user to play games of Blackjack vs the computer "dealer". The application will also keep track of the user's credits, an alternative to using real currency.

### Rules 

The objective of Blackjack is to have your hand come closest to 21 as possible without going over. You are initially dealt 2 cards and can then choose to hit (get dealt another card) or stand (turn is over).

If your score goes over 21, it is called a bust, and you automatically lose. If you remain under 21 and stand, the dealer then begins their turn. However, the dealer must abide by certain rules. If their score is under 17 they MUST hit, otherwise they MUST stand. 

If the dealer goes over 21, they bust and you win 2 credits. If you and the dealer end with the same score, it is a push (tie) and you receive the credit back.

### Card Values

All number cards (2-10) are worth their own value.
Aces can be worth 1 or 11, whichever is more benificial.
Face cards are worth 10.
