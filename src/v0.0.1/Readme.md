# RPG Simulator

This project intends to provide a framework to model the crunch (rules) of a game through single-user and multi-user interaction. 

The framework will provide generic utiliies to support functionality of a traditional role-playing game through a configuration loaded at run time.

## Version 
v0.0.1 - How to Play a Simple Game (Tic Tac Toe)

## Goals

 * 

## Research

Wikipedia<sup>[1]</sup> on what makes a game: 

---

<table><tr><td>

### Rules & Aims
</td></tr><tr><td>

##### * \[a\] rule identifies a _necessary condition_ for permissible action.
##### * an aim identifies a _sufficient condition_ for successful action

</td></tr><tr><td>

Per - https://en.wikipedia.org/wiki/Necessity_and_sufficiency
* ***necessity*** and ***sufficiency*** are terms used to describe a conditional or implicational relationship between two statements
* a ***necessary*** condition is one which must be present in order for another condition to occur
* a ***sufficient*** condition is one which produces the said condition
* In the conditional statement, `if S, then N`, 
    * the expression represented by `S` is called the ***antecedent***
    the expression represented by `N` is called the ***consequent***.

</td></tr><tr><td>
∴ for the purposes of playing a Game, a Rule can be defined a 
</td></tr>
</table>

<table><tr><td>

 #### Rules of Tic Tac Toe

</td></tr>
<tr><td>

 To **have an empty 3x3 grid** it is necessary to have:
 * nine cells that are restricted in value to `X`, `O`, of `undefined`
 * the cells be arranged in 3 rows and 3 columns
 * all cells be set to `undefined`

</td></tr>
<tr><td>

 To **play a game** it is necessary to have all of:
 * an empty 3x3 grid

</td></tr>
</table>

A __necessary _condition___ is a one that must be present for an event to occur. 


A __permissible _action___ is an on that can be taken as part of playing the game

THUS:  

-  ___Rules for Tic Tac Toe___
    1.  An empty 3x3 grid is necessary for playing the game. 
    2.  Two players are necessary for playing the game
    3.  Each player must chose a unique icon (traidionally X & O)
    4.  Both players must decide who is the first active player
    5.  Active player must mark their icon in an empty grid square
    6.  Active player must pass active player status to the other player 


* Play begins with picking the initial active player.
* Players must alternate marking on the grid with their marker
* Play ends when 3 of the same mark occur in a line on the grid
    * Declare player whose mark occurs 3 times in a line "WINNER"
    * Declare other player "LOSER"
* Play ends when there are no unmarked grid spaes
    * Declare both players have "TIED"

Aims - an aim identifies a _sufficient condition_ for successful action
- A _sufficient condition_ is a condition or set of conditions that will produce the event.
* 
* Aims are the conditions that are necessary for resulting in a sucess. 

* Be declared "WINNER"
* Avoid being declared "LOSER"
    * Prevent other player from being declared "WINNER"
* Avoid being declared "TIED"
* Mark a square on the board
* Pick a marker
* Decide on play order





## References
---
<sup>[1]</sup> Game, "From Wikipedia, the free encyclopedia", @ [wikipedia.org/wiki/Game](https://en.wikipedia.org/wiki/Game): 2020-07-28-1627-UTC

