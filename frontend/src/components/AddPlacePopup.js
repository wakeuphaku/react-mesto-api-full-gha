import React from "react";
import { PopupWithForm } from "./PopupWithForm.js";


function AddPlacePopup(props) {

    const [place, setPlace] = React.useState("");
    const [link, setLink] = React.useState("");

    React.useEffect(() => {
        setPlace('');
        setLink('');
    }, [props.isOpen]);

    function handleCardName(e) {
        setPlace(e.target.value);
    }

    function handleCardLink(e) {
        setLink(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            place,
            link
        });
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__form-block">
                <input

                    id="place-input"
                    minLength="2"
                    maxLength="30"
                    required
                    placeholder="Название"
                    name="place"
                    type="text"
                    className="popup__input popup__input_text-place"
                    onChange={handleCardName}
                    value={place}

                />
                <span className="popup__input-error place-input-error"></span>
            </div>
            <div className="popup__form-block">
                <input
                    id="link-input"
                    required
                    placeholder="Ссылка на картинку"
                    name="link"
                    type="url"
                    className="popup__input popup__input_text-link"
                    onChange={handleCardLink}
                    value={link}
                />
                <span className="popup__input-error link-input-error"></span>
            </div>

        </PopupWithForm>
    )
}

export default AddPlacePopup;