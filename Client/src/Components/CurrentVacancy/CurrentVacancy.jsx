// libraries
import React from 'react'
import { useHistory } from 'react-router'

// styles
import './CurrentVacancy.scss'

function CurrentVacancy({ vacancyInfo }) {
    const history = useHistory()

    return (
        <div className="vacancie_id">
            <div className="vi_title">&#10004; {vacancyInfo.title}</div>
            <div className="vi_company"><span>Компания: </span> {vacancyInfo.company}</div>
            <div className="vi_price"><span>Зарплата: </span> {vacancyInfo.price}</div>
            <div className="vi_desc"><span>Описание: </span> {vacancyInfo.desc}</div>
            <div className="vi_tags"><span>Теги: </span> {vacancyInfo.tags}</div>
            <div className="vi_date"><span>Добавлено: </span>: {vacancyInfo.date}</div>
            <button onClick={() => history.push('/vacancies')}>Назад</button>
        </div>
    )
}

export default CurrentVacancy
