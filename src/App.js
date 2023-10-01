import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      winningLine: []
    };  

    this.lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const i = event.target.id;
    //spread operator
    let squares = [...this.state.squares];
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const theWinner = this.calculateWinner(squares);
    this.winner = theWinner.player;
    this.winningLine = theWinner.winningLine;
    this.xIsNext = !(this.xIsNext); 

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winner: theWinner.player,
      winningLine: theWinner.winningLine
    });
  }

  calculateWinner(squares) {
    for (let i = 0; i < this.lines.length; i++) {
      const [a, b, c] = this.lines[i];
      if (squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c]) {
            return {player: squares[a], winningLine: this.lines[i]};
      }
    }
    return {player: null, winningLine: []};
  }

  renderSquare(i) {
		const className = (this.state.squares[i] == null) ? "square" :
		  (this.state.winner != null && 
		  this.state.winner === this.state.squares[i]) &&
		  this.state.winningLine.includes(i) ? 
			"square-winner" : "square-full";
        const enabled = (this.state.winner == null && this.state.squares[i] == null) ? true : false;
        const eventHandler = (enabled) ? this.handleClick :  () => {};
        const output = 
            <div className={className} 
                id={i}
                onClick={eventHandler}>
                {(this.state.squares[i] != null) ? this.state.squares[i] : ""}
            </div>;   
      return output;
  }

  render() {
    let status;
    if (this.state.winner) {
      status = 'Winner: ' + this.state.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
  
    return (  
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
            {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
        <div className="board-row">
            {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="board-row">
            {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
      </div>
    );
  }

}

export default App;
