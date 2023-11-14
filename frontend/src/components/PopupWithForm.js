export function PopupWithForm(props) {
    return (
        <div className={`popup popup-${props.name} ${props.isOpen && 'popup_opened'}`} >
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form className={`popup__form popup-${props.name}__form`} name={props.name} onSubmit={props.onSubmit} >
                    {props.children}
                    <button type="submit" className={`popup__button popup-${props.name}__button`}>Сохранить</button>
                </form>
                <button onClick={props.onClose} type="button" className="popup__close-button"></button>
            </div>
        </div >
    )
}