import cardBack from './images/Card_Back.png'
import card4Hearts from './images/card_4Hearts.png'
import card4Diamonds from './images/card_4Diamonds.png'
import card5Hearts from './images/card_5Hearts.png'
import card6Hearts from './images/Card_6Hearts.png'
import { useState } from "react";

let pickedCard = null;

const cardKeys = {
    H4: { suite: 'H', cardValue: 4, image: card4Hearts },
    D4: { suite: 'D', cardValue: 4, image: card4Diamonds },
    H5: { suite: 'H', cardValue: 5, image: card5Hearts },
    H6: { suite: 'H', cardValue: 6, image: card6Hearts }
}

function Card({ card }) {
    const [revealed, setRevealed] = useState(true);
    // console.log(cardKeys[card]);

    const image = revealed ? <img className="card-img" src={cardKeys[card].image} alt="front" onClick={touched}></img> : <img className="card-img" src={cardBack} alt="back" onClick={touched}></img>;
    function touched() {
        console.log("card: " + card + " " + !revealed);
        setRevealed(!revealed);
        if(!revealed){
            pickedCard = card; 
        } else 

        console.log("Picked Card: " + card);
    }


    return (
        <div className='card'>
            {image}
        </div>
    );
}


function Stack({ cards }) {
    return (
        <div>
            <div className='card'>

            </div>
        </div>
    );
}



export default function Screen() {
    //Clubs, Spades, Hearts, Diamonds
    // const cards = [{ suite: 'H', cardValue: 4 }, {}];
    const[cards, setCards] = Array([]) 
    return <>
        <div className="header-title">
            <h1>Carder</h1>
        </div>
        <div className='body'>
            <div className='stack-body'>
                <Stack />
                <Stack />
                <Stack />
            </div>
            <div className="card-container">
                <Card card={'H4'} />
                <Card card={'D4'} />
                <Card card={'H5'} />
                <Card card={'H6'} />
            </div>
        </div>
    </>
}







/*
(1) Wait I don't have a clue on earth what I am doing. 
    Which is not good for this project. It's a real bummer. 
    Like wtf I was supposed to make a decent project, but
    alas we haven't done a single thing. 
(2) I think it almost makes sense to split the front and the back
    cards, up. And then I'm pretty sure they do their own thing on 
    top of doing a shared action on when clicked. Like i'm pretty sure
    that is how that works, but honestly, im not very sure. 
    This is actually really complicated and I'm not sure on how you 
    would actually create this thing. Like it doesn't make much sense to 
    me. I feel like this could be a useful thing to learn. 
(3) There is like too much going on with this thing. Like, how do I update
    the objects states, while also not doing too much. Like it doesn't make a lot of sense to me. Like how? 
    I want to be able to select a specific card and make it move to a new box. 
(4) I would almost need a state to keep track of what is in each box. 
    There's the group box, and then there should be arrays for each of the
    stacks. So that's tecnically how this should opperate. 
*/