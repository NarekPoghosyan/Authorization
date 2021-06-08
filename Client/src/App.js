// libraries
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// pages
import { LoginPage, AuthPage, VacanciesPage, NewVacanciePage, VacancyIdPage } from './pages/indexPage'

function App() {
  const [vacancyInfo, setVacancyInfo] = useState({})
  const [pathById, setPathById] = useState('')

  const changePathById = (id, vacInfo) => {
    setVacancyInfo(vacInfo)
    setPathById(id)
  }

  return (
    <div className="App">
      <div className="content">
        <Router>
          <Switch>
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/register" exact>
              <AuthPage />
            </Route>
            <Route path="/vacancies" exact>
              <VacanciesPage changePathById={changePathById} />
            </Route>
            <Route path="/create" exact>
              <NewVacanciePage />
            </Route>
            <Route path={`/vacancy/${pathById}`}>
              <VacancyIdPage vacancyInfo={vacancyInfo} />
            </Route>
          </Switch>
          <Redirect to="/login" />
        </Router>
      </div>
    </div>
  );
}

export default App;
