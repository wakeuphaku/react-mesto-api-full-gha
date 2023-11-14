import React from "react";
import { PopupWithForm } from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__form-block">
                <input
                    onChange={handleChangeName}
                    value={name || ''}
                    id="name-input"
                    minLength="2"
                    maxLength="30"
                    required
                    placeholder="Введите имя"
                    name="name"
                    type="text"
                    className="popup__input popup__input_text-name" />
                <span className="popup__input-error name-input-error"></span>
            </div>
            <div className="popup__form-block">
                <input
                    onChange={handleChangeDescription}

                    value={description || ''}
                    id="hobby-input"
                    minLength="2"
                    maxLength="200"
                    required
                    placeholder="Введите хобби"
                    name="hobby"
                    type="text"
                    className="popup__input popup__input_text-hobby"
                />
                <span className="popup__input-error hobby-input-error"></span>
            </div>

        </PopupWithForm>
    )
}

export default EditProfilePopup;