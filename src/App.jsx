import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ChartPage from './pages/ChartPage'
import ExpenseTracker from './pages/ExpenseTracker'
import Navigation from './Components/ExpenseNavbar'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<ExpenseTracker />} />
            <Route path="/charts" element={<ChartPage />} />
          </Routes>
        </Container>
      </div>
    </Router>
  )
}

export default App