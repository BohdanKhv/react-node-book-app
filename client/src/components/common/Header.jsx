import { Link } from 'react-router-dom'
import './styles/header.css'

const Header = () => {
  return (
    <>
    <header>
      <div className="img"></div>
      {/* <div className="concord-img-gradient"></div> */}
      <div className="container">
        <div className="info">
          <h1>Deciding what to read next?</h1>
          <p>You’re in the right place. Tell us what titles or genres you’ve enjoyed in the past, and we’ll give you surprisingly insightful recommendations.</p>
          <div className="actions">
            <Link to='/search' className="btn btn-primary">Search</Link>
            <Link to='/search' className="btn">Genres</Link>
          </div>
        </div>
      </div>
      <div className="wave layer-2"></div>
      <div className="wave layer-3"></div>
    </header>
    </>
  )
}

export default Header