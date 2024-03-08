import './styles.css'

export const PopUp = ({ title, text, onReject, onAccept }) => {
    const handleKeyDown = (event) => {
        console.log(event.key);
        if (event.key === 'Enter') {
            onAccept();
        }
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content" style={{background: '#dee0dc'}}>
                <div className="dialog">
                    <h1 className="dialog-title">{title}</h1>
                    <p className="dialog-content">{text}</p>
                </div>
                <div className="button_container">
                    <button className="option-button" style={{background: '#FD3939'}}
                            onClick={onReject}>No</button>
                    <button className="option-button" style={{background: '#54B544'}}
                            onClick={onAccept} onKeyDown={handleKeyDown} autoFocus>Yes</button>
                </div>
                <button className="popup-close" style={{background: '#FD3939', color: '#FD3939'}}
                        onClick={onReject}>x</button>
            </div>
        </div>
    );
};
