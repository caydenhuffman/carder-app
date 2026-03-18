import { useState } from "react";

const COLORS = [
  "dimgray",
  "seagreen",
  "midnightblue",
  "darkred",
  "olive",
  "orangered",
  "orange",
  "lime",
  "plum",
  "aqua",
  "blue",
  "lightcoral",
  "black",
  "teal",
  "laserlemon",
  "darkpurple",
  "deeppink",
  "palegreen",
  "lightskyblue",
  "peachpuff",
];

const EXTRA_STACKS_BY_HEIGHT = {
  4: 2,
  5: 3,
  6: 3,
};

function cloneStacks(stacks) {
  return stacks.map((stack) => stack.map((ball) => ({ ...ball })));
}

function shuffle(array) {
  let remaining = array.length;

  while (remaining) {
    const randomIndex = Math.floor(Math.random() * remaining--);
    const temp = array[remaining];
    array[remaining] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}

function createRandomBoard(colors, ballCount) {
  const balls = [];

  colors.forEach((color) => {
    for (let i = 0; i < ballCount; i += 1) {
      balls.push({ id: `${color}-${i}`, color });
    }
  });

  shuffle(balls);

  const stacks = [];
  for (let i = 0; i < balls.length; i += ballCount) {
    stacks.push(balls.slice(i, i + ballCount));
  }

  const extraStacks = EXTRA_STACKS_BY_HEIGHT[ballCount] ?? 2;
  for (let i = 0; i < extraStacks; i += 1) {
    stacks.push([]);
  }

  return stacks;
}

function isBoardSolved(stacks, ballCount) {
  if (!stacks.length) {
    return false;
  }

  return stacks.every((stack) => {
    if (stack.length === 0) {
      return true;
    }

    if (stack.length !== ballCount) {
      return false;
    }

    return stack.every((ball) => ball.color === stack[0].color);
  });
}

export default function App() {
  return (
    <main className="appShell">
      <section className="heroCard">
        <p className="eyebrow">Ball Sort Puzzle</p>
        <h1 className="title">Cayden&apos;s Ball Sorter</h1>
        <p className="subtitle">
          Same favorite puzzle, just with a cleaner board, better controls, and
          a sturdier undo history.
        </p>
      </section>
      <Group />
    </main>
  );
}

function Group() {
  const [ballCount, setBallCount] = useState(5);
  const [selected, setSelected] = useState(-1);
  const [currentStacks, setCurrentStacks] = useState([[]]);
  const [history, setHistory] = useState([]);

  const hasGame = currentStacks.some((stack) => stack.length > 0);
  const solved = hasGame && isBoardSolved(currentStacks, ballCount);

  function resetBoard(size) {
    setBallCount(size);
    setSelected(-1);
    setCurrentStacks([[]]);
    setHistory([]);
  }

  function startGame() {
    setSelected(-1);
    setHistory([]);
    setCurrentStacks(createRandomBoard(COLORS, ballCount));
  }

  function pushHistory(nextStacks) {
    setHistory((previousHistory) => [cloneStacks(currentStacks), ...previousHistory]);
    setCurrentStacks(nextStacks);
  }

  function addStack() {
    const nextStacks = [...cloneStacks(currentStacks), []];
    setSelected(-1);
    pushHistory(nextStacks);
  }

  function undo() {
    if (!history.length) {
      return;
    }

    const [previousBoard, ...rest] = history;
    setSelected(-1);
    setCurrentStacks(previousBoard);
    setHistory(rest);
  }

  function stackClick(stackId) {
    if (selected === -1) {
      setSelected(stackId);
      return;
    }

    if (selected === stackId) {
      setSelected(-1);
      return;
    }

    const nextStacks = cloneStacks(currentStacks);
    const fromStack = [...nextStacks[selected]];
    const toStack = [...nextStacks[stackId]];

    if (fromStack.length === 0 || toStack.length >= ballCount) {
      setSelected(-1);
      return;
    }

    if (toStack.length > 0 && fromStack[0].color !== toStack[0].color) {
      setSelected(-1);
      return;
    }

    const movedBall = fromStack.shift();
    if (!movedBall) {
      setSelected(-1);
      return;
    }

    toStack.unshift(movedBall);

    while (
      fromStack.length > 0 &&
      fromStack[0].color === movedBall.color &&
      toStack.length < ballCount
    ) {
      toStack.unshift(fromStack.shift());
    }

    nextStacks[selected] = fromStack;
    nextStacks[stackId] = toStack;

    setSelected(-1);
    pushHistory(nextStacks);
  }

  return (
    <section className="gameCard">
      <div className="toolbar">
        <div className="controls">
          <button className="menuButton primaryButton" onClick={startGame}>
            Start Game
          </button>
          <button className="menuButton secondaryButton" onClick={addStack}>
            Add Stack
          </button>
          <button
            className="menuButton secondaryButton"
            onClick={undo}
            disabled={!history.length}
          >
            Undo
          </button>
        </div>

        <div className="sizePicker">
          <span className="sizeLabel">Ball height</span>
          {[4, 5, 6].map((size) => (
            <button
              key={size}
              className={`numberButton ${ballCount === size ? "numberButtonActive" : ""}`}
              onClick={() => resetBoard(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="statusBar">
        <p className="statusText">
          {solved
            ? "Board solved. Time to admire it and scramble another one."
            : hasGame
              ? "Tap one stack, then another, to move matching balls."
              : "Press Start Game to generate a fresh puzzle."}
        </p>
        <p className="statusMeta">
          {history.length} undo{history.length === 1 ? "" : "s"} available
        </p>
      </div>

      <div className="group">
        {currentStacks.map((stack, index) => (
          <Stack
            key={`stack-${index}`}
            stack={{ id: index, balls: stack }}
            selected={selected}
            stackClick={() => stackClick(index)}
            ballCount={ballCount}
          />
        ))}
      </div>
    </section>
  );
}

function Stack({ stack, stackClick, selected, ballCount }) {
  return (
    <button
      type="button"
      className={`stackContainer ${selected === stack.id ? "stackSelected" : ""}`}
      onClick={stackClick}
    >
      <span className="stackGlow" />
      <div className={`stack stack${ballCount}`}>
        <div className="stackLip" />
        {stack.balls.map((ball) => (
          <Ball key={ball.id} ball={ball} />
        ))}
      </div>
    </button>
  );
}

function Ball({ ball }) {
  return (
    <div className={`ball ${ball.color}`}>
      <span className="ballHighlight" />
    </div>
  );
}
