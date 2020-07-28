# RPG Simulator

This project intends to provide a framework to model the crunch of a game through single-user and multi-user interaction. 

The framework will provide generic utiliies to support functionality of a traditional role-playing game through a configuration loaded at run time.

## Version 
v0.0.0 - Define A Game Framework

## Goals

 * Define what makes up a Game
 * Prototype all objects that make up the definition
 * Implement tests of all functionality in the definition

### Research
Wikipedia on what makes a game<sup>[1]</sup>
> A game is a structured form of play... 

> Key components of games are goals, rules, challenge, and interaction...

> ### Tools 
> Games are often classified by the components required to play them

> ### Rules and aims
> Whereas games are often characterized by their tools, they are often defined by their rules. 
> While rules are subject to variations and changes, enough change in the rules usually results in a "new" game.

> The rules of a game are to be distinguished from its aims. For most competitive games, the ultimate ‘aim’ is winning...
> when we talk about the aims of a game, we also refer to intermediate aims: the things that you have to do in order to win the game
> On a general level, the distinction between the rules and the aims of a game can be characterised as follows: an aim identifies a sufficient condition for successful action, whereas the rule identifies a necessary condition for permissible action.

> ### Skill, strategy, and chance
> A game's tools and rules will result in its requiring skill, strategy, luck, or a combination thereof

> ### Single-player games & ### Multiplayer games
> Most games require multiple players.
> a one-player game is a battle solely against an element of the environment (an artificial opponent), against one's own skills, against time, or against chance
> A multiplayer game is a game of several players who may be independent opponents or teams.
> Games with many independent players are difficult to analyze formally using game theory as the players may form and switch coalitions

> ## Types
> Games can take a variety of forms, from competitive sports to board games and video games.


For the purposes of this 

Generalized games are:
* Games are a System of rules
* Games are interacted with by users through the act of _playing_ a Session using the
* All Users that play a game are thus called Players
* Games begins play by beginning a Session (instance of playing)
* Sessions are played on a Platform (real, virtual, imaginary)
* Players join the Platform at the beginning of a Session
* Sessions begin when enough Players have joined
* Each Session breaks play into Phases
* Phases may break down into other Phases
* Each Phase may have different rules
* Systems may have rules that apply to all Phases
* Characters are fielded to the Tabletop by seated Players
* Players without Characters may create from the System rules
* Players make moves until the Session end condition is met 
* Session end condition is defined by the system

<sup>[1]</sup> Game, "From Wikipedia, the free encyclopedia", @ [wikipedia.org/wiki/Game](https://en.wikipedia.org/wiki/Game): 2020-07-28-1627-UTC