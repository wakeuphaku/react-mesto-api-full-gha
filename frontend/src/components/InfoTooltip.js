import React from 'react';
import uncorrect from '../../src/images/uncorrect.svg';
import correct from '../../src/images/correct.svg';


export default function InfoTooltip(props) {
    return (
        <div className={`popup popup-correct  ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">


                <img className="popup__status" src={props.success ? correct : uncorrect} alt="Статус" />

                <p className="popup__status-text">
                    {props.success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз"}
                </p>
                <button onClick={props.onClose} type="button" className="popup__close-button"></button>
            </div>
        </div>

    )
}