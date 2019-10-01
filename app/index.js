import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Nav from './components/Nav'
import { ThemeProvider } from './contexts/theme'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading';

// Include Lazy Routes:
const Stories  = React.lazy(() => import('./components/Stories.js'))
const User     = React.lazy(() => import('./components/User.js'))
const Comments = React.lazy(() => import('./components/Comments.js'))

function App() {
   const [theme, setTheme] = React.useState('light')

   const toggleTheme = () => {
      setTheme((theme) => {
         return theme === 'light' ? 'dark' : 'light'
      })
   }

   return (
      <Router>
         <ThemeProvider value={theme}>
            <div className={theme}>
               <div className="container">
                  <Nav toggleTheme={toggleTheme}/>

                  <React.Suspense fallback={<Loading />}>
                     <Switch>
                        <Route exact path='/' render={() => (
                           <Stories type='top' />
                        )} />
                        <Route exact path='/new' render={() => (
                           <Stories type='new' />
                        )} />
                        <Route exact path='/user/:userId' component={User} />
                        <Route exact path='/comments/:postId' component={Comments} />
                        <Route render={() => (<h1>404 Not Found.</h1>)} />
                     </Switch>
                  </React.Suspense>
               </div>
            </div>
         </ThemeProvider>
      </Router>
   )
}

ReactDOM.render(
   <App />,
   document.getElementById('app')
)