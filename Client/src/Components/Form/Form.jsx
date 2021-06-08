// libraries
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router'

// components
import Date from './Date/Date'
import Submit from '../Submit/Submit'

// styles
import './Form.scss'

const Form = () => {
    const history = useHistory()
    const [form, setForm] = useState({
        name: '',
        surname: '',
        patron: '',
        email: '',
        newUserDate: '',
        password: '',
        confPassword: '~'
    })

    const changeInputHandler = event => {
        return setForm({ ...form, [event.target.name]: event.target.value })
    }

    const takeSelectHandler = valDate => {
        return setForm({ ...form, newUserDate: `${valDate.day}. ${valDate.month}. ${valDate.year}` })
    }

    const authRequest = async () => {
        try {
            const incData = Object.values(form).filter(elem => {
                return elem === ''
            })

            if (incData.length > 0) {
                alert('Заполните все строки')
                return
            }

            if (form.password !== form.confPassword) {
                alert('Пароли не совподают')
                return
            }

            const response = await fetch('/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
            const resData = await response.json()
            alert(resData.message);
            console.log(3333)
            history.push('/login')
        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <Fragment>
            <div className="form">
                <div className="welcome">АВТОРИЗАЦИЯ</div>
                <form className="name_surname">
                    <input type="text" placeholder="Введите имя" className="ns_inputs" name="name" onChange={changeInputHandler} required pattern=".{3,}" title="Минимум 3 символа"></input>
                    <input type="text" placeholder="Введите фамилия" className="ns_inputs" name="surname" onChange={changeInputHandler} required pattern=".{3,}" title="Минимум 3 символа"></input>
                </form>
                <div className="patronymic">
                    <input type="text" placeholder="Введите отчество" name="patron" onChange={changeInputHandler} required pattern=".{3,}" title="Минимум 3 символа"></input>
                </div>
                <Date takeSelectHandler={takeSelectHandler} />
                <div className="email">
                    <input type="email" placeholder="Введите e-mail" name="email" onChange={changeInputHandler} required title="Окончание должен быть @mail.ru или @gmail.com"></input>
                </div>
                <div className="password">
                    <input type="password" placeholder="Введите пароль" name="password" onChange={changeInputHandler} required pattern=".{6,}" title="Минимум 6 символа"></input>
                </div>
                <div className="confirm_password">
                    <input type="password" placeholder="Повторите пароль" name="confPassword" onChange={changeInputHandler} className={form.password === form.confPassword ? "check" : null} pattern=".{6,}" title="Минимум 6 символа"></input>
                </div>
            </div>
            <Submit authRequest={authRequest} />
        </Fragment>
    )
}

export default Form;