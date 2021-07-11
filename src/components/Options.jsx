import { showOptions, setWallsVisibility, setGridSize, setMusicAndSound } from "../js/handler";

const Options = () => {

    const gridSizes = [ 15, 20, 25, 30, 35, 40, 45, 50];

    return (
        <div className="options">
            <button onClick={ showOptions }><i className="fa fa-bars"></i></button>

            <div className="option_list" style= { {transform:'scale(0)'} }>
                <div className="option">
                    <span>Walls ? </span>
                    <input type="checkbox" id="walls" onChange={ setWallsVisibility } />
                    <label htmlFor="walls" className="toggle">
                        <span className="handler"></span>
                    </label>
                </div>
                <hr />

                <div className="option">
                    <span>Grid ? </span>
                    <select id="gridSize" onChange={ setGridSize }>
                    { gridSizes.map(size => <option key={ size } value={ size }> { size } × { size } </option>) }
                    </select>
                </div>
                <hr />

                <div className="option">
                    <span>Music ? </span>
                    <input type="checkbox" id="music" onChange={ setMusicAndSound } />
                    <label htmlFor="music" className="toggle">
                        <span className="handler"></span>
                    </label>
                </div>

                <div className="option">
                    <span>Sound ? </span>
                    <input type="checkbox" id="sound" onChange={ setMusicAndSound } />
                    <label htmlFor="sound" className="toggle">
                        <span className="handler"></span>
                    </label>
                </div>

            </div>
        </div>
    );
}

export default Options;