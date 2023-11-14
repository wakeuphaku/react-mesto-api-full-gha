import React from 'react';
import { PopupWithForm } from "./PopupWithForm.js";


function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="avatar"
            title="Обновить аватар"
            onSubmit={handleSubmit}


        >
            <div className="popup__form-block">
                <input
                    className="popup__input popup__input_text-avatar"
                    type="url"
                    name="link"
                    id="avatar-input"
                    required
                    placeholder="Ссылка на картинку"
                    ref={avatarRef}
                />
                <span className="popup__input-error avatar-input-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;