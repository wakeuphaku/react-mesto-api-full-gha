import React from "react";

import { Card } from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext"



export default function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike }) {


    const currentUser = React.useContext(CurrentUserContext);




    return (
        <main>
            <section className="profile">
                <div className="profile__avatar" onClick={onEditAvatar}>
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar-image" />
                </div>

                <div className="profile-info">
                    <h1 className="profile-info__name">{currentUser.name}</h1>

                    <button onClick={onEditProfile} type="button" className="profile-info__edit-button"></button>

                    <p className="profile-info__hobby">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
            </section>

            <template className="elements">
                {cards.map(card => (
                    <Card
                        card={card}
                        key={card._id}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
            </template>
        </main>
    )
}
