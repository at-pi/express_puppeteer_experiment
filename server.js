//console.log('Hi')
const express = require ('express')
const app = express()

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    console.log("hi")
    res.render("index")
})

const urlRouter = require('./routes/urls')

app.use('/urls', urlRouter)

app.listen(3000)