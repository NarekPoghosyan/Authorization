// libraries
import React from 'react'
import { useHistory } from 'react-router'

// styles
import './HeaderVacancies.scss'

function HeaderVacancies() {
    const history = useHistory()

    const logout = () => {
        localStorage.removeItem('userData')
        window.location.reload()
    }

    return (
        <div className="header_vacancies">
            <button className="create" onClick={() => history.push('/create')}><span>Создать вакансию</span></button>
            <button className="logout" onClick={logout}>Выход</button>
        </div>
    )
}

export default HeaderVacancies
