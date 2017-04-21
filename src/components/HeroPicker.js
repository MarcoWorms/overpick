import React from 'react'
import flags from '../flags'
import roles from '../roles'
import { Grid, Cell } from 'react-mdl'

import { propEq, find, replace, toLower, toUpper, head, tail, pipe } from 'ramda'

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
        minWidth: '90px',
        cursor: 'pointer',
        height: 170,
        // height: flag.color ? 50 : 150,
        // border: 'solid 2px #555',
        borderLeft: 'none',
        borderTop: 'none',
        borderRadius: '20px',
        background: `url(./images/${image}_portrait.png) ${props.alignImage}`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: flag.color ? `rgba(${flag.color}, 0.5)` : 'rgba(255, 255, 255, 0.1)',
        // boxShadow: `2px 2px 5px #aaa`,
        transition: '0.2s ease-out',
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={() => props.pickHero(props.name)}
      onContextMenu={(e) => {
        e.preventDefault()
        props.unpickHero(props.name)
      }}
    >
      <div
        style={{
          backgroundColor: flag.color
            ?`rgba(${flag.color}, 0.9)`
            :'rgba(255, 255, 255, 0.7)',
          // border: flag.color && 'solid 1px black',
          fontSize: '8pt',
          height: '15px',
          width: '100%',
          transition: '0.2s ease-out',
          position: 'absolute',
          top: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: flag.name === 'Nope' && 'white'
        }}
      >
        {props.name}
      </div>
      <div
        style={{
          backgroundColor: flag.color && `rgba(${flag.color}, 0.9)`,
          // border: flag.color && 'solid 1px black',
          fontSize: '14pt',
          height: '30px',
          width: '100%',
          transition: '0.2s ease-out',
          position: 'absolute',
          bottom: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: flag.name === 'Nope' && 'white'
        }}
      >
        {flag.name}
      </div>
    </div>
  )
}

const HeroColumn = props =>
  <Cell
    col={3}
    tablet={2}
    phone={2}
    style={{
      margin: 0,
      padding: 0,
      paddingBottom: '10px',
      borderRadius: '30px',
      borderLeft: 'solid rgba(255, 255, 255, 0.1) 2px',
      borderRight: 'solid rgba(255, 255, 255, 0.1) 2px',
    }}
  >
    <Grid
      style={{
        margin: 0,
        padding: 0,
        justifyContent: 'space-around',
      }}
    >
      <Cell col={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={`./images/${props.role.type}.png`} />
      </Cell>
      {props.heroes.map(hero =>
        <Cell
          col={6}
          key={hero.name}
          style={{
            margin: 0,
            padding: 0,
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
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
  </Cell>

export default props =>
  <Grid
    style={{
      alignItems: 'start',
      justifyContent: 'space-around',
      width: '100%',
      margin: 0,
      padding: 0,
    }}
  >
    {
      roles.map(role => <HeroColumn
        heroes={props.heroes.filter(propEq('role', role.type))}
        role={role}
        picks={props.picks}
        pickHero={props.pickHero}
        unpickHero={props.unpickHero}
      />)
    }
  </Grid>
