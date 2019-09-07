import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Nav from './components/Nav'
import { ThemeProvider } from './contexts/theme'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Include Lazy Routes:
const Posts    = React.lazy(() => import('./components/Posts.js'))
const User     = React.lazy(() => import('./components/User.js'))
const Comments = React.lazy(() => import('./components/Comments.js'))

class App extends React.Component {
   state = {
      theme: 'light',
      toggleTheme: () => {
         this.setState({
            theme : theme === 'dark' ? 'light' : 'dark'
         })
      }
   }

   render() {
      return (
         <Router>
            <ThemeProvider value={this.state}>
               <div className={this.state.theme}>
                  <div className="container">
                     <Nav />

                     <React.Suspense fallback={<div>Loading...</div>}>
                        <Switch>
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