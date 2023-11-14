import React from "react";
import cardBack from './images/Card_Back.png';

// const Card = ({onClick, card, index, isInactive, isFlipped})

export default function Card({ onClick, card, index, isInactive, isFlipped, isDisabled }) {
    const handleClick = () => {
        !isFlipped && !isDisabled && onClick(index);
    };

    return (
        <div className="Card"
            onClick={handleClick}>
            <div className="card-face card-font-face">
                <img src={cardBack} alt="cardBack" />
            </div>
            <div className="card-face card-back-face">
                <img src={card.image} alt="card" />
            </div>
        </div>

    );

}

