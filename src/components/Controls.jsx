import { updateDirection, showGamePad } from "../js/handler";

const Controls = () => {

    return (
        <>
            <button className="gamepad" onClick={ showGamePad }><i className="fa fa-gamepad"></i></button>
            <div className="controls">
                <button className="up" onClick={ () => updateDirection({code : 'ArrowUp'}) }></button>
                <button className="right" onClick={ () => updateDirection({code : 'ArrowRight'}) }></button>
                <button className="down" onClick={ () => updateDirection({code : 'ArrowDown'}) }></button>
                <button className="left" onClick={ () => updateDirection({code : 'ArrowLeft'}) }></button>
            </div>
        </>
    );
}

export default Controls;