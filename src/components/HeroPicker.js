import React from 'react'
import { propEq, find, } from 'ramda'
import flags from '../flags'
import { Grid, Cell } from 'react-mdl'

import { replace, toLower, toUpper, head, tail, pipe } from 'ramda'

const capitalize = string => toUpper(head(string)) + tail(string)

const imageName = pipe(
  replace(/\.|\:| /g, ''),
  toLower,
  capitalize
)

const HeroCard = (props) => {
  const findFlag = find(propEq('name', props.flagName))
  const flag = props.flagName ? findFlag(flags) : {}
  const image = imageName(props.name)
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '150px',
        margin: 'auto',
        cursor: 'pointer',
        height: '100px',
        border: 'solid 2px #555',
        borderLeft: 'none',
        borderTop: 'none',
        borderRadius: '20px',
        background: `url(./images/${image}_portrait.png) ${props.alignImage}`,
        backgroundSize: 'cover',
        backgroundColor: flag.color || '#ddd',
        boxShadow: `2px 2px 5px #aaa`,
        transition: '0.2s ease-out',
      }}
      onClick={() => props.pickHero(props.name)}
      onContextMenu={(e) => {
        e.preventDefault()
        props.unpickHero(props.name)
      }}
    >
      <div
        style={{
          float: 'left',
          backgroundColor: flag.color,
          border: flag.color && 'solid 1px black',
          borderRadius: '1000%',
          height: '15px',
          width: '15px',
          transition: '0.2s ease-out',
        }}
      />
    </div>
  )
}

export default props =>
  <Grid style={{ width: '95%' }}>
    {props.heroes.map(hero =>
      <Cell col={2} key={hero.name}>
        <HeroCard
          name={hero.name}
          alignImage={hero.alignImage}
          description={hero.description}
          flagName={props.picks[hero.name]}
          pickHero={props.pickHero}
          unpickHero={props.unpickHero}
        />
      </Cell>
    )}
  </Grid>
