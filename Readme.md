# RPG Simulator

This project intends to provide a framework to model the crunch of a game through single-user and multi-user interaction. 

The framework will provide generic utiliies to support functionality of a traditional role-playing game through a configuration loaded at run time.


## Version History
v0.0.0 - Define A Game Framework

__Goals:__

Not defined within any rules to be prototyped is the definition of a "Game".

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