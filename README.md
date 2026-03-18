# Cayden's Ball Sorter

A personal ball sorting puzzle built with React and deployed to GitHub Pages.

This project started as an older experiment and has gradually been cleaned up and polished into the current version. The game is still intentionally small and simple, but it now has a more modern UI, better undo handling, playful animations, and a few quality-of-life fixes for touch devices.

## Live Site

The app is configured for GitHub Pages here:

`https://caydenhuffman.github.io/carder-app`

## What the Game Does

The game generates stacks of colored balls. The goal is to sort the balls so each non-empty tube contains only one color.

Rules in the current implementation:

- You can move balls from one tube to another by selecting a source tube and then a destination tube.
- A move is only allowed if the destination tube has room.
- A move is only allowed if the destination tube is empty or the top ball color matches.
- Matching balls are moved as a group when possible.
- You can add an extra empty tube after the game has started.
- You can undo previous moves.

## Current Features

- Modernized purple/indigo visual theme
- Mobile-friendly layout for iPad play
- Animated board entrance and move feedback
- Undo support
- Adjustable tube height modes: `4`, `5`, or `6`
- Win-state detection with a celebration banner
- Custom yellow heart favicon

## Tech Stack

- React 18
- `react-scripts` / Create React App tooling
- GitHub Pages for deployment

## Project Structure

The important files are:

- `src/App.js`
  Main game logic and UI structure. This file handles:
  board creation, moving balls, undo history, extra stacks, win detection, and animation state.

- `src/index.css`
  Main layout, component styling, button styling, tube sizing, and animation keyframes.

- `src/colors.css`
  Ball color classes.

- `src/index.js`
  React app entry point.

- `public/index.html`
  Base HTML document and favicon link.

- `public/manifest.json`
  Basic web app metadata.

## Development

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Deployment

This repo is set up for GitHub Pages using the `gh-pages` package.

Build and deploy with:

```bash
npm run deploy
```

The `homepage` field in `package.json` is already configured for the GitHub Pages URL.

## Notes About Game State

The current game state lives inside `Group` in `src/App.js`.

Important pieces of state:

- `ballCount`
  The current tube height mode.

- `currentStacks`
  The live board.

- `history`
  Previous board snapshots for undo.

- `selected`
  The currently selected tube id.

- `lastMove`
  Small bit of UI state used for playful move animations.

## Notes About Tube Sizing

Tube heights are intentionally hardcoded in `src/index.css`.

They were based on the actual rendered ball size and spacing, then adjusted to leave a little visual breathing room above the top ball.

## Known Nice Future Ideas

- Save in-progress games to `localStorage`
- Add move count / best score tracking
- Add a stronger win celebration
- Add a small reset or new-game confirmation flow if needed

## Why This Repo Looks Cleaner Now

This project originally had older archived files from earlier experiments. Those were removed once the current app structure was clear, so the repo should now mostly reflect the live game instead of old prototypes.
