import React from 'react'
import { Grid, Cell } from 'react-mdl'
import { Button } from 'belle'

export default props => (
  <Grid>
    <Cell
      col={12}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
  </Grid>
)
