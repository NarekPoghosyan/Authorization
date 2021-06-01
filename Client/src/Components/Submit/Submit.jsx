import React from 'react'
import { useHistory } from 'react-router-dom'
import './Submit.scss'

const Submit = ({ authRequest }) => {
    const history = useHistory()

    return (
        <div className="submit">
            <div onClick={authRequest} className="reg"><span>Регистрация</span></div>
            <div onClick={() => history.push('/')} className="log">Уже есть аккаунт ?</div>
        </div >
    )
}

export default Submit;