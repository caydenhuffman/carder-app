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
  "red"
];

const EXTRA_STACKS_BY_HEIGHT = {
  4: 3,
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
  const [currentStacks, setCurrentStacks] = useState([]);
  const [history, setHistory] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [boardAnimationKey, setBoardAnimationKey] = useState(0);

  const hasGame = currentStacks.length > 0;
  const solved = hasGame && isBoardSolved(currentStacks, ballCount);

  function resetBoard(size) {
    setBallCount(size);
    setSelected(-1);
    setCurrentStacks([]);
    setHistory([]);
    setLastMove(null);
  }

  function startGame() {
    setSelected(-1);
    setHistory([]);
    setLastMove(null);
    setCurrentStacks(createRandomBoard(COLORS, ballCount));
    setBoardAnimationKey((currentKey) => currentKey + 1);
  }

  function pushHistory(nextStacks) {
    setHistory((previousHistory) => [cloneStacks(currentStacks), ...previousHistory]);
    setCurrentStacks(nextStacks);
  }

  function addStack() {
    const nextStacks = [...cloneStacks(currentStacks), []];
    setSelected(-1);
    setLastMove({
      stackId: nextStacks.length - 1,
      ballIds: [],
      key: Date.now(),
    });
    pushHistory(nextStacks);
  }

  function undo() {
    if (!history.length) {
      return;
    }

    const [previousBoard, ...rest] = history;
    setSelected(-1);
    setLastMove(null);
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

    const movedBallIds = toStack.map((ball) => ball.id).slice(0, toStack.length - nextStacks[stackId].length);

    nextStacks[selected] = fromStack;
    nextStacks[stackId] = toStack;

    setSelected(-1);
    setLastMove({
      stackId,
      ballIds: movedBallIds,
      key: Date.now(),
    });
    pushHistory(nextStacks);
  }

  return (
    <section className="gameCard">
      <div className="toolbar">
        <div className="controls">
          <button className="menuButton primaryButton" onClick={startGame}>
            Start Game
          </button>
          <button
            className="menuButton secondaryButton"
            onClick={addStack}
            disabled={!hasGame}
          >
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

      {solved ? (
        <div className="statusBar statusBarWin">
          <p className="statusText">
            Board solved. Time to admire it and scramble another one.
          </p>
          <p className="statusMeta">
            {history.length} undo{history.length === 1 ? "" : "s"} available
          </p>
        </div>
      ) : null}

      <div key={boardAnimationKey} className="group boardAnimated">
        {currentStacks.map((stack, index) => (
          <Stack
            key={`stack-${index}`}
            stack={{ id: index, balls: stack }}
            selected={selected}
            stackClick={() => stackClick(index)}
            ballCount={ballCount}
            animationIndex={index}
            movedHere={lastMove?.stackId === index}
            movedBallIds={lastMove?.stackId === index ? lastMove.ballIds : []}
            moveAnimationKey={lastMove?.key}
          />
        ))}
      </div>
    </section>
  );
}

function Stack({
  stack,
  stackClick,
  selected,
  ballCount,
  animationIndex,
  movedHere,
  movedBallIds,
  moveAnimationKey,
}) {
  return (
    <button
      type="button"
      className={`stackContainer stackContainer${ballCount} ${
        selected === stack.id ? "stackSelected" : ""
      } ${movedHere ? "stackJustMoved" : ""}`}
      style={{ animationDelay: `${animationIndex * 28}ms` }}
      onClick={stackClick}
    >
      <span className={`stackGlow stackGlow${ballCount}`} />
      <div className={`stack stack${ballCount}`}>
        <div className="stackLip" />
        {stack.balls.map((ball) => (
          <Ball
            key={`${ball.id}-${moveAnimationKey ?? "idle"}`}
            ball={ball}
            justMoved={movedBallIds.includes(ball.id)}
          />
        ))}
      </div>
    </button>
  );
}

function Ball({ ball, justMoved }) {
  return (
    <div className={`ball ${ball.color} ${justMoved ? "ballJustMoved" : ""}`}>
      <span className="ballHighlight" />
    </div>
  );
}
