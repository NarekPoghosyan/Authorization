// libraries
import React, { Fragment, useEffect, useState } from 'react'

// styles
import './Date.scss'

const Date = ({ takeSelectHandler }) => {
    const [userDate, setUserDate] = useState({
        day: '1',
        month: 'Январь',
        year: '2021',
    })

    useEffect(() => {
        takeSelectHandler(userDate)
    }, [])

    const changeSelectHandler = event => {
        takeSelectHandler(userDate)
        return setUserDate({ ...userDate, [event.target.id]: event.target.value })
    }

    function createOptions(arr) {
        return new Array(1).fill(arr.map((elem, index) => {
            return <option value={elem} key={index}>{elem}</option>
        }))
    }

    return (
        <Fragment>
            <label>Выберите дату рождения</label>
            <div className="date">
                <select id="day" onChange={changeSelectHandler} required>
                    {createOptions([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])}
                </select>
                <select id="month" onChange={changeSelectHandler} required>
                    {createOptions(["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"])}
                </select>
                <select id="year" onChange={changeSelectHandler} required>
                    {createOptions(["2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993"])}
                </select>
            </div>
        </Fragment>
    )
}

export default Date;