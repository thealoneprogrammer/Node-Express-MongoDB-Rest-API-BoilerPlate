const app = require('express')()

require('dotenv').config()
const PORT = process.env.PORT || 3000

require('./connection')

//Routes
const authRoute = require('./routes/auth/auth')
const postRoute = require('./routes/post')
// Middlewares
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Route middilewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
})
