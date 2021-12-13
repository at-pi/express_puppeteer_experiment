const express = require("express")
const router = express.Router()
const puppeteer = require('puppeteer')


let storage = []
let i = 0;

const func = async (url) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    return page
}

router.get('/url', (req, res) => {
    
    const id = req.query.id
    const url = req.query.url
    
})

module.exports = router