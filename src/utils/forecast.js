const request = require('postman-request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=17b92f721ea9af53c62b90830e784cee&query='+latitude+','+longitude

    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback('unable to connect to location services', undefined)
            console.log(error)
        }else if(response.body.error){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,'Right now in '+ response.body.location.name+','+response.body.location.country +' it is '+response.body.current.weather_descriptions+' and currently '+response.body.current.temperature+' degrees')
        }
    })
}

module.exports = forecast