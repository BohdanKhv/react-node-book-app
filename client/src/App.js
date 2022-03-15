import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Main, Search } from './pages'
import { Footer, Nav } from './components';

function App() {
  return (
    <>
      <Router>
        <Nav/>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/search' element={<Search/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
