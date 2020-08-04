# RPG Simulator

This project intends to provide a framework to model the crunch (rules) of a game through single-user and multi-user interaction. 

The framework will provide generic utiliies to support functionality of a traditional role-playing game through a configuration loaded at run time.

## Version 
v0.0.0 - Define A Game Framework

## Goals

 * Define what makes up a Game
 * Prototype all objects that make up the definition
 * Implement tests of all functionality in the definition

## Research

Wikipedia<sup>[1]</sup> on what makes a game: 

---


> # Game
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

> ### Single-player games & Multiplayer games
> Most games require multiple players.
> a one-player game is a battle solely against an element of the environment (an artificial opponent), against one's own skills, against time, or against chance
> A multiplayer game is a game of several players who may be independent opponents or teams.
> Games with many independent players are difficult to analyze formally using game theory as the players may form and switch coalitions

> ## Types
> Games can take a variety of forms, from competitive sports to board games and video games.


## Analysis
### Preface
For the purposes of designing a framework, generalized concepts of a game are distilled into functional objects that interact with each other. 

As what makes a game is outlined below, formatting is as follows:
* __`Concept`__: a noun signifying knowledge the framework will replicate
* _`action`_:  a verb signifying functionality the framework will replicate.

### Definitions
With these two things in mind, this project attempts to distills playing a game down into the following statment:

> A __`Game`__ is a __`System`__ of __`Concepts`__ and __`Actions`__ that can be interacted with by __`Users`__. 

>  This interaction is called _`playing`_.

> _`playing`_ consists of a __`User`__ that
> 1) _`choses`_ which __`Action`__ to execute
> 2) _`provides`_ the arguments (__`Concepts`__, __`Actions`__, __`Users`__) for this __`Action`__ 
> 3) _`executes`_ the chosen __`Action`__ with the arguments _`provided`_

> An instance of __`Users`__ _`playing`_ a __`Game`__ is called a __`Session`__.

> _`Sessions`_ are _`started`_ by a single __`User`__, but may be _`joined`_ by others.


| Glossary | Type | Description |
|:------------:|:---:|:-------|
| __`Action`__ | Function | any `function` of the __`Game`__ that can be `executed` by a __`User`__, directly or indirectly on a __`User`__, __`Concept`__, or the execution of another __`Action`__ |
| __`Concept`__ | Object | Any __`Rule`__ or __`Aim`__ of the __`Game`__. Any __`Tools`__ required to play the game. Any meta-knowledge required understand ( i.e.   __`this`__ ) |
| __`User`__ | Choice | Anything that can execute an __`Action`__ when a __`Game`__ _`prompts`_ for input during a __`Session`__ of _`play`_. Additionally, a __`Session`__ of a __`Game`__ is _`started`_ by a __`User`__ |

### Examples 

#### Example #1 - Baseball
| Term | Some Examples |
|:------------:|:-------|
| __`Action`__ | atPlate, hit, throw, catch, touch (player), touch (base), walk, homerun |
| __`Concept`__ | Ball {typeOf Tool}, Ball {typeOf Call}, Bat, Bases, Call, Foul, Inning, Out, Run, Out, |
| __`User`__ | Coach, Pitcher, Player, Baseman, Out-Fielder, Batter, Catcher, Umpire  |

#### Example #2 - Monopoly
| Term | Some Examples |
|:------------:|:-------|
| __`Action`__ | trade, rent, roll, auction, mortgage, bankrupt |
| __`Concept`__ | Money, Property, Jail, Board, Square (element of Board), Hotel, Houses, Dice, Token |
| __`User`__ | Player, Banker, Realtor  |

#### Example #3 - Super Mario Bros.
| Term | Some Examples |
|:------------:|:-------|
| __`Action`__ | jump, land, kill, damage, collect, descend |
| __`Concept`__ | Coins, Enemies, Power-Up, Environmental Hazards, Platforms, Flag Pole, Bridge Axe, Sprites |
| __`User`__ | Controller 1, Controller 2  |

#### Example #4 - Dungeons and Dragons
| Term | Some Examples |
|:------------:|:-------|
| __`Action`__ | create character, level, attack, defend, lift bars, turn undead, cast spell, roll, save against |
| __`Concept`__ | Characters, Roles, Dice, Abilities, Environment |
| __`User`__ | Player Characters, Referee/Dungeon Master/Games Master  |


## Design
* Object Managers 
    * Systems need to be able to manage the actions, concepts, and 

## Acceptance Test
Model a basic game in engine, Tic Tac Toe

Tools
* an unmarked 3x3 Grid
* a Marker to fill Grid with X
* a Marker to fill Grid with O

#### Rules 
----
<center><sup>"\[a\] rule identifies a _necessary condition_ for permissible action."</sup></center>

A __necessary condition__ is a one that must be present for an event to occur. 

A __permissible action__ is an action that can be taken as part of playing the game

- __Rules are the conditions that are necessary to make actions available to players__

-  ___Rules for Tic Tac Toe___
    1.  An empty 3x3 grid is necessary for playing the game
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

