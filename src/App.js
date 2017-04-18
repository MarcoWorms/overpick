import React, { Component } from 'react'
import { Grid, Cell } from 'react-mdl'
import { Button } from 'belle'
import { omit, keys, head } from 'ramda'

import heroes from './heroes'

import { HeroCard, FlagPicker } from './components'

import flags from './flags'

class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			heroes,
      picks: {},
      flag: head(keys(flags)),
		}
	}
  componentDidMount () {
    if (localStorage.picks) {
      this.setState({ picks: JSON.parse(localStorage.picks)})
    }
  }
  handleHeroPicks (picks) {
    try {
      localStorage.picks = JSON.stringify(picks)
    }
    catch (e) {
      console.log('No local storage :(')
    }

    this.setState({
      picks,
    })
  }
  handleFlagSelection = (name) => {
    this.setState({ flag: name })
  }
  pickHero = (name) => {
    const picks = {
      ...this.state.picks,
      [name]: this.state.flag,
    }
    this.handleHeroPicks(picks)
  }
  unpickHero = (name) => {
    const picks = omit([name], this.state.picks)
    this.handleHeroPicks(picks)
  }
  unpickAll = (name) => {
    const picks = {}
    this.handleHeroPicks(picks)
  }
  canGenerateSheet = () => !(keys(this.state.picks).length === this.state.heroes.length)
	render () {
    return (
      <div className="App">
        <Grid>
          <Cell col={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h4>Select your pick preference and then</h4>
            <Button
              style={{ margin: '0 10px' }}
              disabled={this.canGenerateSheet()}
              primary={!this.canGenerateSheet()}
            >
              Make a sheet!
            </Button>
            <h4>or</h4>
            <Button
              style={{ margin: '0 10px' }}
              onClick={this.unpickAll}
            >
              Clear Picks
            </Button>
          </Cell>
        </Grid>
        <Grid>
          <FlagPicker
            flag={this.state.flag}
            handleFlagSelection={this.handleFlagSelection}
          />
        </Grid>
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
      </div>
    )
  }
}

export default App
