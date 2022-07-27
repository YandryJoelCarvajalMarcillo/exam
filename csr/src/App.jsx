import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Crud } from './Crud'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Crud /> }></Route>
      </Routes>
    </Router>
  )
}

export default App
