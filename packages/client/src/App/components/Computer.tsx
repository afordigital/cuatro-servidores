import React, { FC, useState, useEffect } from 'react'
import pcOff from '../../assets/pc-off.png'
import pcOn from '../../assets/pc-on.gif'

type ComputerType = {
  id: string
  globalState: boolean
}

export const Computer: FC<ComputerType> = ({ id, globalState }) => {
  const URL = `http://localhost:8000/status/${id}`

  const [load, setLoad] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!globalState) {
      setActive(false)
      setLoad(0)
    } else {
      setActive(true)
    }
  }, [globalState])

  useEffect(() => {
    if (active) {
      let interval = setInterval(() => {
        fetch(URL)
          .then(response => response.json())
          .then(data => setLoad(data.load))
      }, 5000)

      return () => {
        clearInterval(interval)
      }
    } else {
      setLoad(0)
    }
  }, [active])

  // click al boton

  return (
    <div className='window' style={{ width: 320, margin: 'auto' }}>
      <div className='title-bar'>
        <div className='title-bar-text'>Server {id}</div>
        <div className='title-bar-controls'>
          <button aria-label='Minimize' />
          <button aria-label='Maximize' />
          <button aria-label='Close' />
        </div>
      </div>
      <div className='window-body'>
        {active ? (
          <img src={pcOn} width={'200px'}></img>
        ) : (
          <img src={pcOff} width={'200px'}></img>
        )}
      </div>
      <div className='status-bar'>
        <p className='status-bar-field'>Status: {active ? 'ON' : 'OFF'}</p>
        <button
          onClick={() => {
            setActive(!active)
          }}
          className='status-bar-field'
        >
          {active ? 'shut down' : 'turn on'}
        </button>
        <p className='status-bar-field'>CPU Usage: {load}%</p>
      </div>
    </div>
  )
}
