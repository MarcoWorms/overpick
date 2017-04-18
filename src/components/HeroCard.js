import React from 'react'
import flags from '../flags'

export default (props) => (
  <div
    style={{
      width: '100%',
      maxWidth: '100px',
      margin: 'auto',
      cursor: 'pointer',
      height: '80px',
      backgroundColor: flags[props.flag],
      border: 'solid 2px #555',
      borderLeft: 'none',
      borderTop: 'none',
      borderRadius: '10%',
      background: `url(./images/${props.icon}) no-repeat`,
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
      backgroundColor: flags[props.flag],
      border: flags[props.flag] && 'solid 1px black',
      borderRadius: '1000%',
      height: '15px',
      width: '15px',
    }} />
  </div>
)
