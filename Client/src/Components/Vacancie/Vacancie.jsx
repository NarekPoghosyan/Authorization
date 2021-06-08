// libraries
import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

// styles
import './Vacancie.scss'

function Vacancie({ vacancies, changePathById }) {
    const history = useHistory()

    const getVacancieInfo = async (id) => {
        try {
            const response = await fetch(`/vacancies/vacancy/${id}`)
            const data = await response.json()
            changePathById(data._id, data)
            history.push(`/vacancy/${data._id}`)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Fragment>
            {vacancies && vacancies.map(elem => {
                return (
                    <div className="vacancie" key={elem._id} onClick={() => getVacancieInfo(elem._id)}>
                        <div className="vacancie_title">{elem.title}</div>
                        <div className="vacancie_company"><span>Компания: </span>{elem.company}</div>
                        <div className="vacancie_price"><span>Зарплата: </span> {elem.price}</div>
                        <div className="vacancie_desc"><span>Описание:</span> {elem.desc}</div>
                        <div className="vacancie_tags"><span>Теги:</span> {elem.tags}</div>
                        <div className="vacancie_date"><span>Добавлено:</span> {elem.date}</div>
                    </div>
                )
            })}
        </Fragment>
    )
}

export default Vacancie
