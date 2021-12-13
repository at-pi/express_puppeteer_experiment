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

const func2 = async (page, url) => {
    const browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.goto(url)
    
    return page
}

router.get('/url', (req,res) => {
    
    const url = req.query.url
    const id = req.query.id

    if( id == null){

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
    }
    else{
        console.log(storage)

        storage.forEach( function(item) {

            console.log(item.id)
            console.log(item.browser)

            if( id == item.id){

                item.browser = new Promise( (resolve, reject) => {
                    func2(item.browser, url)
                    .then( page => {
                        console.log('successfully shifted the page')
                        resolve(page)
                    })
                    .catch( err => reject('could not shift the page'))
                })

                Promise.all([item.browser])
                .then( page => {
                    res.send(item.id+' '+item.browser)
                    console.log(item.browser)
                })
                
                return false
            }
        })
    }

})

module.exports = router