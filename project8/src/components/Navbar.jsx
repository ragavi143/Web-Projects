import { NavLink } from 'react-router-dom'

function Navbar() {
  const links = [
    ['Home', '/'],
    ['About', '/about'],
    ['Introduction', '/introduction'],
    ['Projects', '/projects'],
    ['Skills', '/skills'],
    ['Contact', '/contact'],
  ]

  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="brand">
          <span className="brand-mark">R</span>
          <span>Ragavi</span>
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
