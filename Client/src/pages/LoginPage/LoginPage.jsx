// libraries
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

// styles
import './LoginPage.scss'

const storageName = 'userData'

const LoginPage = () => {
    const history = useHistory()
    const [userData, setData] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        check()
    }, [])

    async function check() {
        try {
            const response = await fetch('/auth/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: localStorage.getItem(storageName),
            })
            const data = await response.json()

            if (!data.okey) {
                localStorage.removeItem(storageName)
            }

            if (data.okey === false) {
                return history.push('/login')
            }
            history.push('/vacancies')
        } catch (e) {
            history.push('/login')
            localStorage.removeItem(storageName)
        }
    }

    const login = async () => {
        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            const data = await response.json()

            if (data.message) {
                alert(data.message)
                return
            }

            const stringifyData = JSON.stringify(data)
            localStorage.setItem(storageName, stringifyData)
            window.location.reload()
        } catch (error) {
            alert(error.message)
        }
    }

    const changeInputHandler = (e) => {
        setData({ ...userData, [e.target.name]: e.target.value })
    }

    return (
        <div className="loginpage">
            ВХОД В СИСТЕМУ
            <input type="email" placeholder="Введите email" required name="email" onChange={changeInputHandler} />
            <input type="password" placeholder="Введите пароль" pattern=".{6,}" name="password" required onChange={changeInputHandler} />
            <div className="login" onClick={login}><span>ЛОГИН</span></div>
            <div className="gotoauth" onClick={() => history.push('/register')}>Не зарегистрированы ?</div>
        </div>
    )
}

export default LoginPage;