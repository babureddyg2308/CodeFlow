import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Routes,Route} from 'react-router-dom'
import Home from './components/Room/Home'
import Editor from './components/Room/Editor'
import  {Toaster} from 'react-hot-toast'
function App() {

  return (
    <>
    <Toaster position='top-center'>

    </Toaster>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/editor/:roomId' element={<Editor/>}/>
      </Routes>
    </>
  )
}

export default App
