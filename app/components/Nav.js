import React from 'react'
import { ThemeConsumer } from '../contexts/theme'
import { NavLink } from 'react-router-dom'
import { FaSun, FaMoon } from 'react-icons/fa'

const activeStyle = {
   color: "#20838a"
}

export default function Nav () {
   return (
      <ThemeConsumer>
         {({ theme, toggleTheme }) => (
            <nav className="row space-between">
               <ul className="row nav">
                  <li>
                     <NavLink
                        to="/"
                        exact
                        activeStyle={activeStyle}
                        className="nav-link"
                     >
                        Top
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        to="/new"
                        exact
                        activeStyle={activeStyle}
                        className="nav-link"
                     >
                        New
                     </NavLink>
                  </li>
               </ul>
               <button
                  className="btn-clear"
                  onClick={toggleTheme}
               >
                  {theme === 'dark'
                     ? <FaSun size={24} color={'#dadada'}/>
                     : <FaMoon size={24} />
                  }
               </button>
            </nav>
         )}
      </ThemeConsumer>
   )
}