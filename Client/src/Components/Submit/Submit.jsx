// libraries
import React from 'react'
import { useHistory } from 'react-router-dom'

// styles
import './Submit.scss'

const Submit = ({ authRequest }) => {
    const history = useHistory()

    return (
        <div className="submit">
            <div onClick={authRequest} className="reg"><span>Регистрация</span></div>
            <div onClick={() => history.push('/login')} className="log">Уже есть аккаунт ?</div>
        </div >
    )
}

export default Submit;