import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { getRouterData } from './config/router'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import stores from './stores'

// 会导致热更新延迟一步
// let router = getRouterData('basic')

configure({
  enforceActions: 'observed' // 严格模式
})

class App extends Component {
  render () {
    return (
      <Provider {...stores}>
        <BrowserRouter>
          <Switch>
            {
              getRouterData('basic').map(route => (
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
      </Provider>
    )
  }
}

export default hot(module)(App)
