import { retry } from '../js/handler';

const GameOver = () => {
    return (
        <>
            <div className="game_over">
                <h1 className="heading">game over</h1>
                <h2>your score</h2>
                <h1 id="yourScore">100</h1>
                <h3 className="hi_score">high score: <span id="hiScore">400</span> </h3>
                
                <form className="retry_form">
                    <button onClick={ retry }> RETRY </button>
                </form>
            </div>
            <div className="instruction">
                Press arrow keys to play...
            </div>
        </>
    );
}

export default GameOver;