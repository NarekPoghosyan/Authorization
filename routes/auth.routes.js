const { Router } = require('express')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('config')
const router = Router()

// /auth/registration
router.post(
    '/registration',
    [
        check('name', 'Минимальная длина имии 3 символов').isLength({ min: 3 }),
        check('surname', 'Минимальная длина фамилии 3 символов').isLength({ min: 3 }),
        check('patron', 'Минимальная длина отчество 3 символов').isLength({ min: 3 }),
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регистрации"
                })
            }

            const { name, surname, patron, newUserDate, email, password } = req.body

            const condidate = await User.findOne({ email })

            if (condidate) {
                return res.status(400).json({ message: "Такой пользователь уже существует" })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({ name, surname, patron, newUserDate, email, password: hashedPassword })

            await user.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
            })

            return res.status(201).json({ message: "Пользователь создан" })

        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    })

// /auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при входе в систему"
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: "Пользователь не найден" })
            }

            const isMatch = await bcrypt.compare(password, user.password)


            if (!isMatch) {
                return res.status(400).json({ message: "Неверный пароль, попробуйте снова" })
            }


            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (error) {
            return res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    })

// /auth/user
router.post(
    '/user',
    async (req, res) => {
        try {
            const decoded = jwt.verify(req.body.token, config.get('jwtSecret'))

            const isOkey = await User.findById(decoded.userId)

            if (!isOkey) {
                res.status(401).json({ message: 'Токен не активирован', okey: false })
            }

            return res.json({ okey: true, message: 'Добро пожаловать' })

        } catch (e) {
            return res.status(401).json({ message: "Что-то пошло не так, во время автоматический входа в систему", okey: false })
        }
    })

// /auth/getData
router.post(
    '/getData',
    async (req, res) => {
        try {
            const getUser = await User.findById(req.body.userId)

            if (!getUser) {
                res.status(401).json({ message: 'Мы не нашли ваши данные', okey: false })
            }

            return res.json({
                data: {
                    name: getUser.name,
                    surname: getUser.surname,
                    patron: getUser.patron,
                    date: getUser.newUserDate,
                    email: getUser.email,
                }, 
                message: 'Ваши данные'
            })

        } catch (e) {
            return res.status(401).json({ message: "Что-то пошло не так, во время автоматический входа в систему", okey: false })
        }
    })

module.exports = router