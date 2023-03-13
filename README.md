![tictacton](/public/icon.png)

# TIC TAC TON

> Tic-Tac-Toe tournament with your friends on Telegram

# Description

_A good game is fun and rewarding _

Built (1) with TWA front-end, so it that can be played directly from Telegram, (2) with TONcoin through TON wallet connectivity, and (3) on the TON blockchain for game results and player ranking stats.

TTT is a non-NFT-based fun board game that can be played by anyone on Telegram.

Our team looked at the web3 game landscape, and we were thoroughly disappointed with so-called web3 games that require you to buy an NFT to play. P2E games are interesting but they don’t deliver what they market. They were not rewarding enough nor fun to play yet.

Therefore, we thought we’d create a fast & easy game interface, delivering fun games, that don’t require the player to learn to play a new game.

It’s a tournament style, so the users are rewarded based on their skill level.

This BUIDL is a simple showcase of the game interface, and can be built upon to deliver more fun, peer-to-peer, and entertaining social games to the TON ecosystem.

# Prerequesities

- Node.js v16 (other versions may work, needs more testing)
- A TON Connect compatible wallet (e.g. [Tonkeeper](https://tonkeeper.com/))

# What does this repo contain?

- A react-based TWA-ready app, interacting with TON
- Github actions set to deploy app to github pages
- A script to connect a telegram bot to the deployed app

# How to use

1. Create a template from this repo with the "Use this template" button

   1. Choose a name for your repo
   2. Important! mark "Include all branches", otherwise github pages deployment will not work.
      ![image](https://user-images.githubusercontent.com/5641469/191731317-14e742fd-accb-47d4-a794-fad01148a377.png)

2. Clone this repo and run `yarn`

3. Create a new bot with [botfather](https://t.me/botfather)
   1. Type `/newbot`
   2. Choose a name for your bot, e.g. `My Ton TWA`
   3. Choose a username for your bot, e.g. `my_ton_twa_482765_bot`
   4. Take note of the access token, e.g. `5712441624:AAHmiHvwrrju1F3h29rlVOZLRLnv-B8ZZZ`
   5. Run `yarn configbot` to link your bot to the webapp

# Development

1. Run `npm run dev` and edit the code as needed
2. On push to the `main` branch, the app will be automatically deployed via github actions.

# Roadmap

- [ ] Jetton transfer support

# License

MIT
