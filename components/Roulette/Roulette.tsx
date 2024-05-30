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
      <canvas ref={canvasRef} height={422} width={422} />
      <div>
        <button onClick={onClickStart}>start</button>
      </div>
    </div>
  )
}

export default Roulette