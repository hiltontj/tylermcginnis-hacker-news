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

class App extends React.Component {
   state = {
      theme: 'light',
      toggleTheme: () => {
         console.log("toggle theme")
         this.setState( ({theme}) => ({
            theme : theme === 'dark' ? 'light' : 'dark'
         }))
      }
   }

   render() {
      return (
         <Router>
            <ThemeProvider value={this.state}>
               <div className={this.state.theme}>
                  <div className="container">
                     <Nav />

                     <React.Suspense fallback={<Loading />}>
                        <Switch>
                           <Route exact path='/' render={() => (
                              <Stories type='top' />
                           )} />
                           <Route exact path='/new' render={() => (
                              <Stories type='new' />
                           )} />
                           <Route exact path='/user/:userId' component={User} />
                           <Route render={() => (<h1>404 Not Found.</h1>)} />
                        </Switch>
                     </React.Suspense>
                  </div>
               </div>
            </ThemeProvider>
         </Router>
      )
   }
}

ReactDOM.render(
   <App />,
   document.getElementById('app')
)