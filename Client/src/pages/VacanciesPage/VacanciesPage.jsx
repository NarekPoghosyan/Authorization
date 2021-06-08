// libraries
import React, { useEffect, useState } from 'react'

// components
import Vacancie from '../../Components/Vacancie/Vacancie'
import HeaderVacancies from '../../Components/HeaderVacancies/HeaderVacancies'

// styles
import './VacanciesPage.scss'

const Vacancies = ({ changePathById }) => {
    const [vacancies, setVacancies] = useState([])

    useEffect(() => {
        getVacancies()
        return () => {
            setVacancies([])
        }
    }, [])

    const getVacancies = async () => {
        try {
            const response = await fetch('/vacancies/getAllVacancies')
            const data = await response.json()
            setVacancies(data.vacancies)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="vacancies">
            <HeaderVacancies />
            <div className="vacancies_content">
                <Vacancie vacancies={vacancies} changePathById={changePathById} />
            </div>
        </div>
    )
}

export default Vacancies;