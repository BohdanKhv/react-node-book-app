import './styles/header.css'

const Header = () => {
  return (
    <header>
      <div className="img"></div>
      <div className="concord-img-gradient"></div>
      <div className="container">
        <div className="info">
          <h1>Book title</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nulla quo eius accusamus eligendi iste dolorum. Incidunt architecto nostrum aperiam dicta adipisci tempore doloribus ducimus, distinctio dolor est quaerat ullam.</p>
          <div className="actions">
            <button className="btn btn-danger">Read</button>
            <button className="btn btn-info">Add To List</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header