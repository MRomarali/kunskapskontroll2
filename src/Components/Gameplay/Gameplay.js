import { symbol } from 'prop-types'
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gameplay.css'


const PlayerCard=({color, symbol})=> {
    const style = {
        background:color
    }
    return(
        <div style = {style} className="player-card">
            {symbol}
        </div>
    )
}

class Gameplay extends Component {
    constructor(props){
        super(props)
        this.symbol=["rock","paper","scissor"]
        this.state = {
            player:'choose',
            computer:'computer',
            winner:'',
            mainStarter:true,
            inputNumber:'',
            rounds:0
        }
    }
    startTheGame = (e) => {
        this.setState({ mainStarter: false })
        this.setState({add:'add a number'})
        if(this.state.inputNumber===0|| this.state.inputNumber===''){
            this.setState({ mainStarter: true })
        }else {
            this.setState({ mainStarter: false })
        }
        e.preventDefault()
	}
    runGame=(e)=>{
        this.setState({
            player:this.state.player,
            computer:this.symbol[Math.floor(Math.random()*3)]
        })
        this.setState({
            winner:this.selectWinner()
        })
        this.setState({ rounds: this.state.rounds + 1 })

        if(this.state.rounds===this.state.inputNumber){
            this.setState({rounds:this.state.rounds=this.state.inputNumber})
            this.setState({again:this.startAgain()})
            this.setState({winner:this.selectWinner()==null})
            this.setState({
                player:this.state.player='replay',
                computer:this.state.computer='replay'
            })
        }
        const {player,computer,symbol} = this.state;
		if (player.move !== symbol) {
			player.symbol.push(player.move);
			computer.symbol.push(computer.move);
			this.setState({
				player: player,
				computer: computer
			})
        }
        e.preventDefault()
        
    }
    onChangeInput(e) {
        this.setState({ inputNumber: parseInt(e.target.value)})
    }
    selectWinner=()=>{
        const { player, computer } = this.state;
		if (player === computer) {
			return "It's a draw!";
		} else if (
			(player === "rock" && computer === "scissors") ||
			(player === "scissors" && computer === "paper") ||
			(player === "paper" && computer === "rock")
		) {
            return "Player Wins!";
		} else {
			return "Computer Wins!";
        }
    }
    startAgain() {
		return "start again"
    }
    restart=()=>{
        this.setState({rounds:this.state.rounds=0})
        this.setState({mainStarter:this.state.mainStarter=true})
        this.setState({
            player:this.state.player='choose',
            computer:this.state.computer='computer'
        })
    }
    
    selectMove=move=>{
        console.log('clicked')
        this.setState({
            player:move
        })
    }

    render() {
        const {winner,again, player, add}=this.state;

        if (this.state.mainStarter  ){
			return (
				<div>
					<h3>Put how many rounds you want to play</h3>
					<input  name="input" type="number" onChange={(e) => { this.onChangeInput(e) }}  />
					<button class="btn btn-outline-success" onClick={this.startTheGame}>Starta Spelet</button> 
                    <h1 className="danger">{add}</h1>
				</div>
			)
        }
        
        return (
            <div className="App">
                <h1 className="player">player</h1>
                <PlayerCard
                    color="green"
                    symbol={this.state.player}
                    />
                    <button class="btn btn-outline-dark" move={player} onClick={()=>this.selectMove("rock")}>rock</button>
                    <button class="btn btn-outline-dark" move={player} onClick={()=>this.selectMove("paper")}>paper</button>
                    <button class="btn btn-outline-dark" move={player} onClick={()=>this.selectMove("scissor")}>scissor</button>
                    <hr/>
                <h1 className="computer">Computer</h1>
                <PlayerCard
                    color="red"
                    symbol={this.state.computer}  />
                    <div className="winner">{winner ? this.selectWinner() : null}</div>
                    <button class="btn btn-outline-success" onClick={this.runGame}>run the game</button>
                    <h1>{this.state.rounds}</h1>
                    <div>{again}</div>
                    <button class="btn btn-outline-danger" onClick={this.restart}>restart</button>
            </div>
        )
    }
}
export default Gameplay;
