import React, { Component } from 'react'
import domToImage from 'dom-to-image'
import {
  objOf, not, equals, omit, keys, head, prop, pipe
} from 'ramda'

import { HeroPicker, FlagPicker, Header } from './components'
import heroes from './heroes'
import flags from './flags'

const initialFlag = pipe(
  head,
  prop('name')
)

const loadPicks = pipe(
  prop('picks'),
  JSON.parse,
  objOf('picks')
)

class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			heroes,
      picks: {},
      selectedFlag: initialFlag(flags),
      generatingSheet: false,
		}
	}
  componentDidMount () {
    if (localStorage.picks) {
      this.setState(loadPicks(localStorage))
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
    this.setState({ selectedFlag: name })
  }
  pickHero = (name) => {
    const picks = {
      ...this.state.picks,
      [name]: this.state.selectedFlag,
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
  canGenerateSheet = () => not(equals(
    keys(this.state.picks).length,
    this.state.heroes.length
  ))
  generateSheet = () => {
    const node = document.querySelector('.toImage')
    const lastWidth = node.style.width
    node.style.width = '1100px'
    this.setState({ generatingSheet: true })
    domToImage.toPng(node)
      .then((dataUrl) => {
        this.setState({ generatingSheet: false })
        node.style.width = lastWidth
        window.open(dataUrl)
      })
  }
  render () {
    return (
      <div className="App">
        <Header
          canGenerateSheet={this.canGenerateSheet()}
          generateSheet={this.generateSheet}
          generatingSheet={this.state.generatingSheet}
          unpickAll={this.unpickAll}
        />
        <FlagPicker
          selected={this.state.selectedFlag}
          handleFlagSelection={this.handleFlagSelection}
        />
        <HeroPicker
          heroes={this.state.heroes}
          picks={this.state.picks}
          pickHero={this.pickHero}
          unpickHero={this.unpickHero}
        />
      </div>
    )
  }
}

export default App
