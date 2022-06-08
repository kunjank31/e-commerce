import React from 'react'
import './loading.css'

const Loading = ({text}) => {
  return (
    <>
      <div className="loading">
        <div className="ball">
          <div className="div"></div>
          <div className="div"></div>
          <div className="div"></div>
        </div>
        <div className="shawdow-group">
          <div className="shawdow"></div>
          <div className="shawdow" style={{margin:'0 98px', position:"absolute"}}></div>
          <div className="shawdow" style={{margin:'0 49px'}}></div>
        </div>
        <h1>{text}</h1>
      </div>
    </>
  )
}

export default Loading