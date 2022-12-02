import './style.css'

let resultUrlInput = document.querySelector('#resultUrl')

document.querySelector('#inputTime').addEventListener('change', (event)=>{
  console.log(event.target.value)

  resultUrlInput.value = document.location.origin + '/byTime.html?time=' +  event.target.value
})


document.querySelector('#inputRoom').addEventListener('change', (event)=>{
  console.log(event.target.value)
  resultUrlInput.value = document.location.origin + '/byRoom.html?room=' +  event.target.value

})



let params = (new URL(document.location)).searchParams
console.log(params.get('a'))

console.log(URL.searchParams)
