import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import './App.css'
import Home from './components/Home'
import Add from './components/Add'
import Edit from './components/Edit'
function App() {

  return (
      <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/adding' element={<Add></Add>}></Route>
          <Route path='/editing' element={<Edit></Edit>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
