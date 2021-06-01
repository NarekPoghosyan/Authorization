import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'

function App() {
  const [isAuth, setIsAuth] = useState(false)

  const changeIsAuth = (bool) => {
    setIsAuth(bool)
  }

  return (
    <div className="App">
      <div className="content">
        <Router>
          <Switch>
            <Route path="/" exact>
              {isAuth ? <HomePage /> : <LoginPage changeIsAuth={changeIsAuth} />}
            </Route>
            <Route path="/auth">
              <AuthPage />
            </Route>
          </Switch>
          <Redirect to="/" />
        </Router>
      </div>
    </div>
  );
}

export default App;
