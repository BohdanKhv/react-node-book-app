import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GenreView, Main, Search, ShowBook, BestBookView } from './pages'
import { Footer, Nav } from './components';

function App() {
  return (
    <>
      <Router>
        <Nav/>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/genre/:id' element={<GenreView/>} />
          <Route path='/book/show/:id' element={<ShowBook/>} />
          <Route path='/bestbook/:id' element={<BestBookView/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
