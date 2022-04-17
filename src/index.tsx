import * as React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import { History } from './pages/history'
import { Editor } from './pages/editor'
import { useStateWithStorage } from './hooks/useStateWithStorage'

const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }
`
const StorageKey = '/editor:text'

const Main: React.FC = () => {
  const [text, setText] = useStateWithStorage("", StorageKey)

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/editor">
            <Editor
              text={text}
              setText={setText}
            />
          </Route>
          <Route exact path="/history">
            <History
              setText={setText}
            />
          </Route>
          <Redirect to="/editor" path="*" />
        </Switch>
      </Router>
      </>
  )
}

render(<Main />, document.getElementById('app'))