import * as React from 'react'
import { useState } from 'react'

import styles from './App.module.scss'
import { Computer } from './components/Computer'

const App: React.FC = () => {
  const [globalState, setGlobalState] = useState(false)

  return (
    <main className={styles.container}>
      <div className={styles.computers}>
        <Computer id={'1'} globalState={globalState} />
        <Computer id={'2'} globalState={globalState} />
        <Computer id={'3'} globalState={globalState} />
        <Computer id={'4'} globalState={globalState} />
      </div>
      <button
        onClick={() => {
          setGlobalState(!globalState)
        }}
      >
        {globalState ? 'Apagar' : 'Encender'}
      </button>
    </main>
  )
}

export default App
