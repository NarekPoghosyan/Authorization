import React, { useEffect, useState } from 'react'
import './HomePage.scss'

const HomePage = () => {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        patron: '',
        date: '',
        email: ''
    })

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const response = await fetch('/auth/getData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: localStorage.getItem('userData')
            })
            const data = await response.json()
            setUserData(data.data)
        } catch (error) {
            alert(error.message)
        }
    }

    console.log(userData.newUserDate)

    return (
        <div className="homepage">
            <div className="homepage_title">ВАШ АККАУНТ</div>
            <div className="congrat">
                <div className="user_data">
                    <div className="ok_data">
                        Имя: {userData.name} <br></br>
                        Фамилия: {userData.surname} <br></br>
                        Отчество: {userData.patron} <br></br>
                        Дата Рождения: {userData.date} <br></br>
                        Email: {userData.email}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;