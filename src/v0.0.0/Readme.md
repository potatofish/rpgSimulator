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

With these two things in mind, this project attempts to distills playing a game down into the following statment:

> _`playing`_ a __`Game`__ is the function of __`Users`__ interacting with the __`Actions`__ and __`Concepts`__ of the __`Game`__ 

For understanding this keep in mind, an _`action`_ is the _`execution`_ of an __`Action`__. 

| Glossary | Type | Description |
|:------------:|:---:|:-------|
| __`Action`__ | Function | any `function` of the __`Game`__ that can be `executed` by a __`User`__, directly or indirectly on a __`User`__, __`Concept`__, or the execution of another __`Action`__ |
| __`Concept`__ | Object | Any __`Rule`__ or __`Aim`__ of the __`Game`__. Any __`Tools`__ required to play the game. Any meta-knowledge required understand ( i.e.   __`this`__ ) |
| __`User`__ | Choice | Anything that can execute an __`Action`__ when a __`Game`__ _`prompts`_ for input during a __`Session`__ of _`play`_. Additionally, a __`Session`__ of a __`Game`__ is _`started`_ by a __`User`__ |


| _`playing`_ : __`Users`__ interacting with the Actions and concepts of a game
</tr></table>

This interaction is the key functionality to _`playing`_ a game.


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

|  Actions  | Nouns |
|:---------:|:-----:|
| _playing_ | |

## References
---
<sup>[1]</sup> Game, "From Wikipedia, the free encyclopedia", @ [wikipedia.org/wiki/Game](https://en.wikipedia.org/wiki/Game): 2020-07-28-1627-UTC

