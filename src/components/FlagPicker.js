import React from 'react'
import { Cell } from 'react-mdl'
import { Button } from 'belle'
import { keys } from 'ramda'

import flags from '../flags'

const FlagButton = props => (
  <Button
    onClick={() => props.handleFlagSelection(props.name)}
    primary={props.name === props.current}
    style={{ margin: '0 10px 10px 10px' }}
  >
    {props.name}
  </Button>
)

export default props => (
  <Cell
    col={12}
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}
  >
    {keys(flags).map(flagName => (
      <FlagButton
        name={flagName}
        key={flagName}
        current={props.flag}
        handleFlagSelection={props.handleFlagSelection}
      />
    ))}
  </Cell>
)
