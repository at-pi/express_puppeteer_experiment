const express = require("express")
const router = express.Router()
const puppeteer = require('puppeteer')

let storage = []
let i = 0;

const openBrowser = async (url, res) => {

    const browser = await puppeteer.launch({ headless:false })
    let pages2 = await browser.pages()
    const page = pages2[0]
    await page.goto(url)

    let pages1 = await browser.pages();

    let obj = {
        'id' : i,
        'browser' : browser
    }
    storage.push(obj)
    
    res.status(200).send('opened browser success, id:'+ i++)

    return browser
}

const redirect = async (browser, url, res) => {
    
    let page = (await browser.pages())
    page = page[0]
    await page.goto(url)
    
    res.status(200).send('redirected')

    return browser
}

const close = async (browser, res) => {
    
    let page = await browser.close()

    res.status(200).send('closed')
}

router.get('/url', (req,res) => {
    
    const url = req.query.url
    const id = req.query.id

    if( id == null){

        openBrowser(url, res)

    }
    else if( id!=null && url!=null) {

        storage.forEach( function(item) {

            if( id == item.id){

                redirect(item.browser, url, res)
            
            }
        })
    }
    else{

        storage.forEach( function(item) {

            if( id == item.id){

                item.browser = close(item.browser, res)

            }
        })
    }

})

module.exports = router