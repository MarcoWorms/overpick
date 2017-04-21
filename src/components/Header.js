import React from 'react'
import { Grid, Cell } from 'react-mdl'
import { Button } from 'belle'
import Octocat from 'react-icons/lib/go/octoface'

export default props => (
  <Grid
    style={{
      paddingTop: 2
    }}
  >
    <Cell
      col={12}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <h4>
        Select your pick preference and then
      </h4>
      <Button
        style={{ margin: '0 10px' }}
        disabled={props.canGenerateSheet}
        primary={!props.canGenerateSheet}
      >
        Make a sheet!
      </Button>
      <h4>
        or
      </h4>
      <Button
        style={{ margin: '0 10px' }}
        onClick={props.unpickAll}
      >
        Clear Picks
      </Button>
    </Cell>
    <a
      style={{
        position: 'absolute',
        right: '0',
        cursor: 'pointer',
        color: 'white',
      }}
      href="https://github.com/MarcoWorms/overpick"
      target="blank"
    >
      <span>
        Source
      </span>
      <Octocat
        style={{
          width: '24px',
          height: '24px',
          margin: '0 5px',
        }}
      />
    </a>
  </Grid>
)
