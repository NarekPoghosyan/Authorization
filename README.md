# Авторизация пользователя на MERN стэк (React Js, Express Js, MongoDB, Node Js).

Для начало - npm install <br />
Для запуска - npm run dev <br />
Во время ввода полей, пожалуйтса посмотрите количество символов, который он просит от вас.

Приложение состоит из клиентской и серверной части, где клиент заполняя свои данные, делает регистрацию и все данные сохраняются в базе данных. После этого он может залогинится. Если он зашел в систему, генерируется Token, который активен 1 час и сохраняется в localStorage. В течении 1 часа не требуется снова залогинится. В системе просто отображается все данные, которые у него есть в базе данных.

## Ради интереса можно взломать систему.

Я специально не сохранил Token в базе данных. Во время рендера компонента HomePage просто проверяется есть ли Token в localStorage и активирован ли он. Я должен был взять этот Token из localStorage и проверить активирован ли он и совподает с Token - ом, который есть в базе данных. Вы можете просто добавить например такой обьект в localStorage и взломать систему. 
{
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGI2NTgyN2Q1MGRkYjFhYjBiMTc5MGEiLCJpYXQiOjE2MjI1NzIzNTUsImV4cCI6MTYyMjU3NTk1NX0.tHglAuCH1HwvC5CYKcq5sQ1r6DJXCUSZBB0zG_Wc2-4"
    userId: "60b65827d50ddb1ab0b1790a"
}

## Использовались такие пакеты...

mongoose <br />
jsonwebtoken <br />
bcrypt <br />
express - validator <br />
config <br />
nodemon <br />
concurrently <br />
proxy <br />
react-router-dom <br />
sass <br />

## Автор Нарек Погосян.