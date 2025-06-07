const Nav = () => {
  return (
    <nav class='navbar'>
      <div class='logo'>
        <h1>🌼 Flor do Campo</h1>
      </div>
      <div class='nav-right'>
        <div class='search-bar'>
          <input
            type='text'
            placeholder='Buscar produtos...'
          />
          <button>
            <i class='fas fa-search'></i>
          </button>
        </div>
        <div class='nav-icons'>
          <a href='#'>
            <i class='fas fa-shopping-cart'></i>
          </a>
          <a href='#'>
            <i class='fas fa-user'></i>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Nav
