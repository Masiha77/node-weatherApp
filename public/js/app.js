
const weatherForm =document.querySelector('form') 
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('click', (e)=>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent ='loading...'
    messageTwo.textContent = ''
    // shouldn't use http so that it would run on the local and also heroku
    fetch(/*http://localhost:3000*/'/weather?address=' + location).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
    
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})

})