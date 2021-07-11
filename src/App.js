import './css/App.css';
import Score from './components/Score';
import Board from './components/Board';
import Options from './components/Options';
import Controls from './components/Controls';
import GameOver from './components/GameOver';

const App = () => {
  return (
    <div className="app">
        <Score />
        <Board />
        <Options />
        <Controls />
        <GameOver />
    </div>
  );
}

export default App;
