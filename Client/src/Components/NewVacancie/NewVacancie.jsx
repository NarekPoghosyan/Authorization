// libraries
import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'

// styles
import './NewVacancie.scss'

function NewVacancie() {
    const [vacancie, setVacancie] = useState({
        company: '',
        title: '',
        desc: '',
        tags: '',
        price: '',
        date: ''
    })
    const history = useHistory()

    const changeInputHandler = (e) => {
        setVacancie({ ...vacancie, [e.target.name]: e.target.value, date: new Date().toLocaleDateString() })
    }

    const newVacancie = async () => {
        try {
            const response = await fetch('vacancies/newVacancie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vacancie)
            })
            const data = await response.json()
            alert(data.message)
            history.push('/vacancies')
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <div className="new_vacancies">
            <div className="add_vacancie">
                Создать новую вакансию
                <input type="text" placeholder="Название компании" name="company" onChange={changeInputHandler} />
                <input type="text" placeholder="Название вакансии" name="title" onChange={changeInputHandler} />
                <input type="text" placeholder="Зарплата" name="price" onChange={changeInputHandler} />
                <input type="text" placeholder="Теги вакансии" name="tags" onChange={changeInputHandler} />
                <textarea placeholder="Описание вакансии." name="desc" onChange={changeInputHandler}></textarea>
                <div>
                    <button onClick={() => history.push('/vacancies')} style={{ backgroundColor: 'royalblue' }}>Назад</button>
                    <button onClick={newVacancie}><span>Создать</span></button>
                </div>
            </div>
        </div>
    )
}

export default NewVacancie
