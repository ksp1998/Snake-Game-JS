const Score = () => {
    return (
        <div className="score">
            <div className="current_score">
                <div>
                    Score: <span id="currentScore">0</span>
                </div>
                <div>
                    High Score: <span id="hiScore">0</span>
                </div>
            </div>
        </div>
    );
}

export default Score;