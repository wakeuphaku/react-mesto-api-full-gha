export function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup-image ${card ? 'popup_opened' : ''}`} >
            <div className="popup-image__block">
                <img alt={card ? card.name : ""} src={card ? card.link : ""} className="popup-image__photo" />
                <p className="popup-image__text">{card ? card.name : ""}</p>
                <button onClick={onClose} type="button" className="popup__close-button"></button>
            </div>
        </div >
    )
}