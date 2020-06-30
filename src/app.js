const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { errorMonitor } = require('stream')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//define paths for express config
const publicDirPAth = path.join(__dirname,'../public')

const viewsPAth = path.join(__dirname, '../templates/views')

const partialPaths = path.join(__dirname,'../templates/partials')

//setup handlebars egnine and views
app.set('view engine', 'hbs')
app.set('views', viewsPAth)
hbs.registerPartials(partialPaths)
//setup static directory to serve
app.use(express.static(publicDirPAth))

app.get('', (req,res) => {
    res.render('index',{
        title:'weather app ',
        "name": 'masiha'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'about me ',
        name:'masiha '
    })
})


app.get('/help',(req,res)=>{
    res.send('help page')
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
    //since the lat, long, location values are destructured from the response, the {} is set as defualt 
    geocode(req.query.address,(error, {latitude, longitude,location} ={}) =>{
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    })  


app.get('products', (req,res) =>{
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about/*', (req,res) =>{
    res.render('404', {
    title:'404',
    name:'masiha',
    errorMessage:'About page not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title:'404',
        name:'masiha',
            errorMessage: 'page not found'
    })
})

app.listen(port,() =>{
    console.log("Server is up on port:3000")
})
