import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export function Card({ card, onCardClick, onCardLike, onCardDelete }) {


    const currentUser = React.useContext(CurrentUserContext);


    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const cardLikeButtonClassName = `element__like ${
        isLiked && 'element__like_active'
    }`;



    const handleCardClick = () => {
        onCardClick(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }




    return (
        <div className="element">
            <img onClick={handleCardClick} src={card.link} alt={card.name} className="element__photo" />
            {isOwn && <button className='element__trash' onClick={handleDeleteClick} />}
            <div className="element__block" >
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like_block">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="element__like_counter">{card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}
