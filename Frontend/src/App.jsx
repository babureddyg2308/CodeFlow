import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Routes,Route} from 'react-router-dom'
import Home from './components/Room/Home'
import Editor from './components/Room/Editor'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/editor' element={<Editor/>}/>
      </Routes>
    </>
  )
}

export default App
