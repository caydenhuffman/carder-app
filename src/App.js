import { useState } from 'react';

export default function App() {
    return (<div>
        <h1>Cayden's Thing</h1>
        <Group />
    </div>);
}


function Group() {
    // const [picked, setPicked] = useState(-1);
    //Hmm we might have to set the id to just the number. Because that makes it really hard to tell the index. 
    const [stacks, setStacks] = useState([
        { id: 0, balls: [] },
        {
            id: 1, balls: [
                { id: "green3", color: "green", picked: 0 },
                { id: "green2", color: "green", picked: 0 },
                { id: "green1", color: "green", picked: 0 },
                { id: "blue1", color: "blue", picked: 0 },
            ]
        },
        {
            id: 2, balls: [
                { id: "red1", color: "red", picked: 0, },
                { id: "red2", color: "red", picked: 0 },
                { id: "blue2", color: "blue", picked: 0 },
                { id: "blue3", color: "blue", picked: 0 },
            ]
        },
        {
            id: 3, balls: [
                { id: "green4", color: "green", picked: 0 },
                { id: "red3", color: "red", picked: 0 },
                { id: "blue4", color: "blue", picked: 0 },
                { id: "red4", color: "red", picked: 0 }]
        },
        { id: 4, balls: [] }]);

    /*
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
*/

    function clickBall(stack, ball) {
        if (ball !== false) {
            console.log("You clicked " + ball.id + " in stack" + stack.id + "!");
            //Now we set that ball as being selected. 
            const tempArray = [...stacks];
            const indexOfBall = tempArray[stack.id].balls.indexOf(ball);
            if (tempArray[stack.id].balls[indexOfBall].picked == 0) {
                let aboveSameBool = true;
                for (let i = indexOfBall; i > 0; i--) {
                    if (tempArray[stack.id].balls[i].color == tempArray[stack.id].balls[i - 1].color) {
                        aboveSameBool = true;
                    } else {
                        aboveSameBool = false;
                        i = 0; 
                    }
                }
                console.log(aboveSameBool)
                // if (aboveSameBool) {
                //     for (let i = indexOfBall; i >= 0; i--) {

                //         tempArray[stack.id].balls[i].picked = 1;
                //     }
                // }
            } else {
                // tempArray[stack.id].balls[indexOfBall].picked = 0;
                for (let i = 3; i > indexOfBall; i--) {
                    tempArray[stack.id].balls[i].picked = 0;
                }
            }
            setStacks(tempArray);

        }
        else if (stack.balls.length == 0) {
            console.log("You clicked the stack" + stack.id);
            // console.log(stacks);
        }

    }

    //lets put yellow on the top. 
    function AddBall(stackId, ball) {
        let tempArray = stacks.slice();
        tempArray[stackId].balls.unshift(ball);
        setStacks(tempArray);
    }

    return (
        <div>
            <button onClick={e => AddBall(2, "yellow")}>Add Ball</button>
            <div className='group'>
                {stacks.map((stack) => {
                    return (<Stack key={stack.id} stack={stack} clickBall={(ball) => clickBall(stack, ball)} />);
                })}
            </div>
        </div>
    );

}

function Stack({ stack, clickBall }) {

    // function clickBall(ballName) {
    //     const stack = clickStack();
    //     // console.log(ballName);
    //     const tempArray = []
    //     setStacks()

    // }

    return (
        <div className='stackContainer'>
            <div className='stack' onClick={e => clickBall(false)}>
                <hr></hr>
                {stack.balls.map((ball) => {
                    return (<Ball ball={ball} key={ball.id} clickBall={e => clickBall(ball)} />);
                })}
            </div>
        </div>
    );
}

function Ball({ ball, clickBall }) {
    return (
        <button className={'ball ' + ball.color + (ball.picked === 1 ? " selected" : "")} onClick={clickBall}></button >
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


/* Notes Vol. 3
(1) we should make it where you click the ball and then it goes and hangs out above the stack. Almost like the bigButton thing that we had before,
    but also how do we handle when there are more than one ball? i'm not sure to be honest. Maybe, we add a spot to lift all the balls up. Like if you were lifting the thing up.
(2) Maybe it's time to make it where we store the state of the balls differently, so we have a name for each item and then we also have a color for it. That way we can compare
    two balls to see if they are the same color.
(3) To implement selecting multiple balls, we can make it where if we click on the bottom one, it checks to see if the ball above it is the same color,
    if it is not the same color, then don't do anything. If it is the same color, check to see if the ball above it is the same color. If it is then check again. If it is not stop. But we also need to repeat this from the index of the ball we click
    all the way to the top of the array.
(4) First let us just reorganize everything so we can carry more than one thing.
(5) We're Gonna build a static version first using the new ideas.
(6) Now we have to make it where when we click on a ball it can change the state of the stacks.
(7) Wait what are we doing now? Like what step is next? Do we implement a way to pick them up. Hmm How Do we do this? Maybe I think we select a ball
    And then we print out all the balls above it. As if we were groupign them together. Should we find a way to make them
    a div element unique? Or maybe we could change their borders as a symbol of being selected.
(8) And how do we move forward? I think when we click a ball we add that it has been selected.
(9) Okay that looks pretty good, how do we now do this from here?
(10) Okay i think first, it would be good to select all index above.
(11) So Far it's looking really good. It mostly, workign the way that I would expect. The only thing is that we'd sometimes want to make sure
     its not the top one.
(12) Now what are we looking to do? What is the next step? I think we are going to try and do something with only picking them if the above is the same color.
     Also just a note, we could definitly keep track of the ones that are picked using the picked state, instead of having it for that. Which i guess it could store the
     The stack id and also the ball ids. Which I guess makes sense and stuff. But how would we then identify if a specific ball is part of that one.
(13) I don't really like how the picked is stored in the thing. Maybe its not good that I'm practically storing it twice to do that. But oh well. 
(14) I think maybe it would be a good idea to make it where when you click on the stack that it takes all t

*/
//Hmm we display based on that state.


// [{ id: "stack1", balls: ["red", "green", "blue"] }, { id: "stack2", balls: ["purple"] }]