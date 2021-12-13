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

router.get('/url', (req,res) => {
    
    const url = req.query.url

    const page = new Promise((resolve, reject) => {
        func(url)
        .then( page => {
            console.log('successfully opened '+url)
            resolve(page)
        })
        .catch( err => reject('failed in opening url'))
    })

    Promise.all([page])
    .then( page => {
        let obj = {
            'id' : i++,
            'browser' : page
        }
        storage.push(obj)
        res.send('opened browser success, id:'+ i)
    })

})

// router.get('/url', (req, res) => {
    
//     const id = req.query.id
//     const url = req.query.url
    
//     console.log('Hi')
//     res.send('hi')
// })

module.exports = router