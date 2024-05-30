"use client"
import React, { CSSProperties } from 'react'
import s from "./Roulette.module.css"
import useRoulette from './useRoulette'

const Roulette = () => {

  const {
    onClickStart,
    canvasRef
  } = useRoulette()

  return (
    <div>
      <canvas ref={canvasRef} />
      <div>
        <button onClick={onClickStart}>start</button>
      </div>
    </div>
  )
}

export default Roulette