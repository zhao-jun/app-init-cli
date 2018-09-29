import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { getRouterData } from './config/router'

let router = getRouterData('basic')
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {
            router.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))
          }
        </Switch>
      </BrowserRouter>
    )
  }
}

export default hot(module)(App)
