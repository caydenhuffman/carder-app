import { useState } from 'react';

// const balls = ["green", "blue", "red"];

/*

function Ball({ ball }) {
    return <button>{ball}</button>
}


function Stack({ balls }) {

    return (
        <div className='stack'>
            {balls.map((ball, index) => {
                return (<Ball key={index} ball={ball} />);
            })}
        </div>
    )
}


function AddColor({ color, balls, setBalls }) {
    return <button onClick={e => setBalls([...balls, color])}>Add {color}</button>
}
export default function App() {
    const [balls, setBalls] = useState(["green", "blue", "red"]);

    return (
        <div>
            <h1>Cayden Huffman</h1>
            <AddColor color={"purple"} balls={balls} setBalls={setBalls} />
            <AddColor color={"pink"} balls={balls} setBalls={setBalls} />
            <div className='group'>
                <Stack balls={balls} setBalls={setBalls} />
            </div>
        </div>
    )
}



function printy(name) {
    console.log("Printing a " + name + " ball!");
}

*/

export default function App() {
    return (<div>
        <h1>Cayden's Thing</h1>
        <Group />
    </div>);
}

//then we want to display all the maps. 

function Group() {
    const [picked, setPicked] = useState(-1);
    const [stacks, setStacks] = useState([{ id: 0, balls: [] }, { id: 1, balls: ["red1", "green1", "blue1", "green2"] }, { id: 2, balls: ["red2", "blue2", "blue3", "green3"] }, { id: 3, balls: ["green4", "red3", "blue4", "red4"] }, { id: 4, balls: [] }]);
    //Note We need to make sure the one were picking up isn't empty. 
    function pick(stack) {
        if (picked != -1) {
            if (stack.id == picked) {
                console.log("Released the " + stacks[stack.id].balls[0] + " ball back down.");
                setPicked(-1);
            } else {
                console.log("The color on the top of the stack youre adding to is: " + stacks[stack.id].balls[stacks[stack.id].balls.length - 1])
                if (stacks[stack.id].balls.length < 4) {
                    let tempArray = [...stacks];
                    console.log("were gonna drop a " + stacks[picked].balls[0] + " into stack" + stack.id);
                    tempArray[stack.id].balls.unshift(tempArray[picked].balls.shift())
                    setPicked(-1);
                    setStacks(tempArray);
                }
            }
        }
        else {
            if (stacks[stack.id].balls.length > 0) {
                setPicked(stack.id);
                console.log("You Pick Up the " + stacks[stack.id].balls[0] + " ball.");
            } else {
                console.log("You can't pick anything up from stack" + stack.id + " because its empty!");
            }
        }

    }



    //lets put yellow on the top. 
    function AddBall(stackId, ball) {
        let tempArray = stacks.slice();
        // tempArray[stack.id - 1]
        tempArray[stackId].balls.unshift(ball);
        setStacks(tempArray);
    }


    return (
        <div>
            <button onClick={e => AddBall(2, "yellow")}>Add Ball</button>
            <div className='group'>
                {stacks.map((stack) => {
                    return (<Stack key={stack.id} stack={stack} setStacks={setStacks} picked={picked} pick={e => pick(stack)} />);
                })}
            </div>
        </div>
    );

}

function Stack({ stack, setStacks, picked, pick }) {
    //Note there, should be an easier way to do that lol

    return (
        <div className='stackContainer'>
            {/* <button className={"bigButton"} >{(picked === -1 ? "Pick Up" : (picked == stack.id ? "Release" : "Drop"))} </button> */}
            <div className='stack' onClick={e => { console.log("You clicked a stack!"); pick(stack); }}>
                <hr></hr>
                {stack.balls.map((ball) => {
                    return (<Ball key={ball} ball={ball} pick={pick} />);
                })}
            </div>
        </div>
    );
}

function Ball({ ball, pick }) {
    return (
        <button onClick={e => console.log("You clicked the ball")} className={'ball ' + ball} > { }</button >
    );
}


/* Notes Vol. 1
(1) This is starting to make sense, But i wanna keep track of each state.
(2) We want to have a state that keeps track of the location for each thing?
    or do we keep track of every element? I'm not quite sure. Hmm Well that is confusing.
(3) I think it would be best to create it in a way that it will do that part.
(4) Now I know how to do this. We have a single object that hold all the stacks. Which we will now have two of.
(5) We need a way for them to move and stuff. But I see how that
(6) Now that We have this thing,
(7) Now we want to make it that when you click on one of them they will delete.
(8) It's almost like they want me to keep track of all the previous and earlier states, which I guess wouldn't be too hard, but for now I'm not gonna worry about that.
(9) We've encountered an issue now, because we want to be able to delete a specific element. With that specific key.
(8) Which I think to do this, we have to change the way it works, and make the buttons thier own component.

(9) Should we be keeping track of them that way? Girl i feel like that might be confusing.
(10) I almost feel like we should be passing it down that way, and not the other way arround.
(Well) I guess we don't want to do it that way because then it will delete a bunch of them. So that would be like a bummer.
So like how do we do that.
(11) I think it's time we add another another stack. Our state should keep track of the each stack.
(12)If we do it this way, then we're keeping track of the keys, I suppose, which I guess can be used to modify the state. Hopefully that won't horribly wreck each state.
(13) Or maybe the state is stored that way, honestly I'm not entirely sure. (like can you have states at different levels?) Do they go differnet places?
(14) We need to put thing with the rigth keys and such. But how do we move them.
(15) There will be a button that will change all those things. Just like we had that list of states back then <3
(16) I think we acheive that by having a state that keeps track of which state is selected, which there could be 3 modes {pickedUpStack, droppedStack, nullStack}. But I'm unsure on how to do this.
(17) Then we need to do something about those buttons, like we need to set the state of that one that as that.
(18) Wait, that doesn't make much sense, to have picked as a thing that goes to each one. Because then it doesn't make much sense to find it. Like we'd need to search for everything.
(19) I think this is not organized the way that it should be.
(20) Wait I think I know why that one was passed that value, which is now super confusing, this is like super hard and I don't quite understand how the fuck this shit is supposed to work. Like its very confusing.
(21) I want to be able to get the top element from that thing.
(22) I don't know how the fuck were supposed to do all this. I think we can do it in a way were we don't need to pass state down to the balls.
(23) Somehow we'd need to keep track of the number
(24) Wait I feel like what were doing isn't too  bad. I don't see that many steps inbetween what were trying to do.
(25) Okay slay we now are able to identify that specific element. Which is cool. So now we need to do another thing where we sent it to another one. Which maybe it would be better to do that another way.

*/
/* Notes Vol. 2
(1) Yay we actually made them balls, which is cool to see. Now we need to get rid of the thing where we click pick up, so that we can click on the balls, which will then result in us picking up all the balls above it that are the same color. Otherwise it wont do anything.
(2) I think things need to be reorganized, also why does it work that way? It Really shouldn't but oh well. In order
    to successfully change the way we pick up balls; Then we need to completely change the parameters for pick. So that it will send the ball, but honestly, I don't know how well drop it in an empty stack. Which makes things kinda hard. Yikes!
    Maybe there's a way to have a button over an empty stack that says something like "Drop Here!". Then i guess it would make sense, but honestly Idk.
(3) Maybe just have a onClick for the stack, but the problem is that, it takes the balls. But honestly If we do stack, then it could be way easier.
*/
//Hmm we display based on that state.


// [{ id: "stack1", balls: ["red", "green", "blue"] }, { id: "stack2", balls: ["purple"] }]