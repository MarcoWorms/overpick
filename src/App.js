import React, { Component } from 'react'
// import './App.css'

import heroes from './heroes'
import { Button } from 'belle'
import { Grid, Cell } from 'react-mdl'
import { omit } from 'ramda'

const flagColors = {
  "Main": '#00ee00',
  "Secondary": '#19cade',
  "If asked": 'yellow',
  "Nope": 'red',
}

const HeroCard = (props) => (
  <div
    style={{
      width: '100%',
      maxWidth: '100px',
      margin: 'auto',
      cursor: 'pointer',
      height: '80px',
      backgroundColor: flagColors[props.flag],
      border: 'solid 2px #555',
      borderLeft: 'none',
      borderTop: 'none',
      // borderColor: flagColors[props.flag],
      borderRadius: '10%',
      background: `url(./images/${props.icon}) no-repeat right top`,
      boxShadow: `2px 2px 5px ${'#999'}`,
    }}
    onClick={() => props.pickHero(props.name)}
    onContextMenu={(e) => {
      e.preventDefault()
      props.unpickHero(props.name)
    }}
  >
    <div style={{
      float: 'left',
      backgroundColor: flagColors[props.flag],
      border: flagColors[props.flag] && 'solid 1px black',
      borderRadius: '1000%',
      height: '15px',
      width: '15px',
    }} />
  </div>
)

const FlagButton = props => (
  <Button
    onClick={() => props.setFlag(props.name)}
    primary={props.name === props.current}
    style={{ margin: '0 10px 10px 10px' }}
  >
    {props.name}
  </Button>
)

const FlagPicker = props => (
  <Cell col={12} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    <FlagButton name="Main" current={props.flag} setFlag={props.setFlag} />
    <FlagButton name="Secondary" current={props.flag} setFlag={props.setFlag} />
    <FlagButton name="If asked" current={props.flag} setFlag={props.setFlag} />
    <FlagButton name="Nope" current={props.flag} setFlag={props.setFlag} />
  </Cell>
)

const HeroList = props => (
  props.flag
  ? <div>
    <img src={`./images/${props.icon}`} />
  </div>
  : null
)

class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			heroes,
      flag: 'Main',
      picks: {},
		}
	}
  componentDidMount () {
    if (localStorage.picks) {
      this.setState({ picks: JSON.parse(localStorage.picks)})
    }
  }
  setFlag = (name) => {
    this.setState({ flag: name })
  }
  pickHero = (name) => {
    const newPicks = {
      ...this.state.picks,
      [name]: this.state.flag,
    }
    localStorage.picks = JSON.stringify(newPicks)

    this.setState({
      picks: newPicks
    })
  }
  unpickHero = (name) => {
    const newPicks = omit([name], this.state.picks)
    localStorage.picks = JSON.stringify(newPicks)

    this.setState({
      picks: newPicks
    })
  }
  unpickAll = (name) => {
    const newPicks = {}
    localStorage.picks = JSON.stringify(newPicks)
    this.setState({
      picks: newPicks
    })
  }
  canGenerateSheet = () => !(Object.keys(this.state.picks).length === this.state.heroes.length)
	render () {
    return (
      <div className="App">
        <Grid>
          <Cell col={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h4>Select your pick preference and then</h4>
            <Button
              style={{ marginLeft: '10px' }}
              disabled={this.canGenerateSheet()}
              primary={!this.canGenerateSheet()}
            >
              Make a sheet!
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              onClick={this.unpickAll}
            >
              Clear Picks
            </Button>
          </Cell>
        </Grid>
        <FlagPicker
          flag={this.state.flag}
          setFlag={this.setFlag}
        />
        <Grid style={{ width: '80%' }}>
          {this.state.heroes.map(hero =>
            <Cell col={2} key={hero.name}>
              <HeroCard
                name={hero.name}
                description={hero.description}
                icon={hero.image}
                flag={this.state.picks[hero.name]}
                pickHero={this.pickHero}
                unpickHero={this.unpickHero}
              />
            </Cell>
          )}
        </Grid>
        {/* <Grid> */}
        {/*   <Cell col={12} style={{ display: 'flex', justifyContent: 'space-around' }}> */}
        {/*     {this.state.heroes.map(hero => */}
        {/*       <HeroList */}
        {/*         name={hero.name} */}
        {/*         icon={hero.image} */}
        {/*         flag={this.state.picks[hero.name]} */}
        {/*       /> */}
        {/*     )} */}
        {/*   </Cell> */}
        {/* </Grid> */}
      </div>
    )
  }
}

export default App
