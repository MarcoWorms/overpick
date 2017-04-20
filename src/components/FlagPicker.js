import React from 'react'
import { Grid, Cell } from 'react-mdl'
import { Button } from 'belle'

import flags from '../flags'

const FlagButton = props => (
  <Button
    onClick={() => props.handleFlagSelection(props.name)}
    primary={props.selected}
    style={{ margin: '0 10px 10px 10px' }}
  >
    {props.name}
  </Button>
)

export default props => (
  <Grid>
    <Cell
      col={12}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {flags.map(flag => (
        <FlagButton
          name={flag.name}
          key={flag.name}
          selected={props.selected === flag.name}
          handleFlagSelection={props.handleFlagSelection}
        />
      ))}
    </Cell>
  </Grid>
)
