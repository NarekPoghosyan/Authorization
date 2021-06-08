const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const Vacancie = require('../models/Vacancie')
const router = Router()

// /vacancies/getAllVacancies
router.get(
    '/getAllVacancies',
    async (req, res) => {
        try {

            const vacancies = await Vacancie.find()

            return res.status(201).json({ vacancies })

        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    })

// /vacancies/newVacancie
router.post(
    '/newVacancie',
    [
        check('company', 'Поле должен быть заполнена').isLength({ min: 1 }),
        check('title', 'Поле должен быть заполнена').isLength({ min: 1 }),
        check('desc', 'Поле должен быть заполнена').isLength({ min: 1 }),
        check('tags', 'Поле должен быть заполнена').isLength({ min: 1 }),
        check('date', 'Дата должен сущевствовать').isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при создании вакансии"
                })
            }

            const { company, price, title, desc, tags, date } = req.body

            const vacancie = new Vacancie({ company, price, title, desc, tags, date })

            await vacancie.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
            })

            return res.status(201).json({ message: "Вакансия создана" })

        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    })

// /vacancies/vacancie
router.get(
    '/vacancy/:id',
    async (req, res) => {
        try {
            const vacancy = await Vacancie.findById(req.params.id)
            return res.json(vacancy)
        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    }
)

module.exports = router