import { useState } from 'react';

export default function App() {
    return (<div>
        <h1>Cayden's Thing</h1>
        <Group />
    </div>);
}


function Group() {

    const ballCount = 5;
    const [selected, setSelected] = useState(-1);
    const [stacks, setStacks] = useState([]);

    function stackClick(stack, stackId) {

        // console.log(stackId);
        if (selected == -1) {
            setSelected(stackId)
        } else if (selected == stackId) {
            setSelected(-1);
        } else {
            console.log("We will be moving stack" + selected + " to stack" + stackId + "!");
            const stacksCopy = [...stacks];
            const fromStack = [...stacks[selected]];
            const toStack = [...stacks[stackId]];

            if (fromStack.length > 0 && toStack.length < ballCount) {

                if (toStack.length === 0 || fromStack[0].color === toStack[0].color) {
                    let firstBall = fromStack.shift();
                    console.log("FirstBall: " + firstBall.id);
                    toStack.unshift(firstBall);
                    while (fromStack.length > 0 && fromStack[0].color == firstBall.color && toStack.length < ballCount) {
                        console.log(fromStack[0]);
                        toStack.unshift(fromStack.shift());
                    }

                } else {
                    console.log("You can't move a ball from this stack because it's empty. ");
                }
            }





            //Update the stacksCopy: 
            stacksCopy[selected] = fromStack;
            stacksCopy[stackId] = toStack;

            // console.log("StacksCopy: ");
            // console.log(stacksCopy);
            // console.log("Stacks: ")
            // console.log(stacks);
            setStacks(stacksCopy);
            setSelected(-1);
        }


    }

    function shuffle(array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    function randomize(colorArray) {
        console.log("Gonna Randomize <3");

        let bigArray = [];
        for (let i = 0; i < colorArray.length; i++) {
            for (let j = 0; j < ballCount; j++) {
                bigArray.push({ id: colorArray[i] + j, color: colorArray[i] });
            }
        }
        bigArray = shuffle(bigArray);

        let stacksRand = [];
        for (let i = 0; i < bigArray.length; i += ballCount) {
            // const stackRand = bigArray.slice(i, i + ballCount);
            // console.log(stackRand);
            stacksRand.push(bigArray.slice(i, i + ballCount));
        }
        stacksRand.push([], []);
        console.log(stacksRand)

        setStacks(stacksRand)
    }

    return (
        <div>
            <button onClick={e => randomize(['green', 'red', 'yellow', 'blue', 'debut', 'fearless', 'speaknow', 'Red', 'l989', 'reputation', 'lover', 'folklore', 'evermore', 'midnights'])}>Randomize</button>
            <button onClick={e => setStacks([...stacks, []])}>Add Stack </button>
            <div className='group'>
                {stacks.map((stack, index) => {
                    return (<Stack key={index} stack={{ id: index, balls: stack }} selected={selected} stackClick={e => stackClick(stack, index)} />);
                })}
            </div>
        </div >
    );

}

//Stack is not the full state, so we shouldn't worry about it. 
function Stack({ stack, stackClick, selected }) {


    return (
        <div className={'stackContainer ' + ((selected == stack.id) ? 'stackSelected' : '')}>
            <div className='stack' onClick={stackClick}>
                <hr></hr>
                {stack.balls.map((ball) => {
                    return (<Ball key={ball.id} ball={ball} />);
                })}
            </div>
        </div>
    );
}

function Ball({ ball }) {

    return (
        <button className={'ball ' + ball.color}></button >
    );
}



/* Notes Vol.1
(1) First we want to implement a function that will print which stack we just clicked on. 
(2) Now we want to have a state that will keep track of which one has been picked? How do we sent the selected to the stack. 
(3) Now we get to move the balls, and we will first start, with just moving the first ball. 

(4) I now realize that this is really poorly designed. Which sucks really hard. but basically, what I'll have to do is rearange the way that it works. 
    My code might be really poorly designed, Honestly I'm unsure tbh. 
(5) We Were successful at that, now we need for the fromStack to keep giving until the color is different. 

(6) Now we have to make it where you can't place it on a stack that has a differnet color, or more than four.
(7) I think first we have to see if we can place it, and then do the while loop, but also make sure were not exceding four in the while loop. 
(8) Now we have to generate the table, So we'll see how to do this. And also it wouldn't be that hard to add a stack that is empty. 
(9) Now How do we make it where there is an undo button. 
*/