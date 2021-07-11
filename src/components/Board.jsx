import { snake } from '../js/handler';

const Board = () => {

    const position = {
        gridRowStart: snake[0].y,
        gridColumnStart: snake[0].x
    }

    return (
        <div className="board">
            <div className="snkae_head" style={position}></div>
        </div>
    );
}

export default Board;