// Step 03b - Simple validation: Clear error message on input

// Card data input
let cardUsername = document.querySelector('#card-name-input')
let cardNumber = document.querySelector('#card-number-input')
let expMonth = document.querySelector('#card-month-input')
let expYear = document.querySelector('#card-year-input')
let cardCvc = document.querySelector('#card-cvc-input')

// Buttons
let submitBtn = document.querySelector('#submit-btn')
let resetBtn = document.querySelector('#reset-btn')

// Error messages
let errorFields = document.querySelectorAll('.error-text')

// Sections
let formElem = document.querySelector('form')
let successElem = document.querySelector('.confirmation-container')

// Card data display
let cardNumberDisplay = document.querySelector('#card-number-display')
let cardNameDisplay = document.querySelector('#card-name-display')
let cardMonthDisplay = document.querySelector('#card-month-display')
let cardYearDisplay = document.querySelector('#card-year-display')
let cardCvcDisplay = document.querySelector('#card-cvc-display')


const inputFields = [
  cardUsername,
  cardNumber,
  expMonth,
  expYear,
  cardCvc
]

// Event Listeners
submitBtn.addEventListener('click', function(){
  // console.log('Hello')

  // Capture state of fields
  let fieldsCompletedStatus = checkFields()

  if(fieldsCompletedStatus){
    displayData()
  } else {
    displayErrorMsgs()
  }
})


resetBtn.addEventListener('click', function(){
  // console.log('Goodbye')

  resetApp()
  successElem.style.display = 'none'
  formElem.style.display = 'block'
})


// Clear error state when field gets a value
inputFields.forEach( field => {

  let errorField = field.nextElementSibling
  let hasErrorMsg = errorField.innerText
  
  if(hasErrorMsg){
    field.addEventListener('keyup', function() {
      field.nextElementSibling.innerText = ''
    })
  }

})


// Methods
function displayData(){
  cardNameDisplay.innerText = cardUsername.value
  cardNumberDisplay.innerText = cardNumber.value
  cardMonthDisplay.innerText = expMonth.value
  cardYearDisplay.innerText = expYear.value
  cardCvcDisplay.innerText = cardCvc.value

  formElem.style.display = 'none'
  successElem.style.display = 'block'
}


function checkFields(){
  let fields = [
    cardUsername.value,
    cardNumber.value,
    expMonth.value,
    expYear.value,
    cardCvc.value
  ]

  return fields.every( field => field !== '')
}


function displayErrorMsgs(){
  let msg = `Can't be blank`

  errorFields.forEach( field => {
    field.style.display = 'block'
    // ToDo: Use 'classlist' to add error state
    field.style.color = 'red'
    field.innerText = msg
  })
}


// No longer needed
// function clearErrorMsgs(){
//   errorFields.forEach( field => {
//     field.innerText = ''
//     field.style.display = 'none'
//   })
// }


function resetApp (){
  cardUsername.value = ''
  cardNumber.value = '' 
  expMonth.value = '' 
  expYear.value = '' 
  cardCvc.value = ''
  cardNumberDisplay.innerText = '0000 0000 0000 0000'
  cardNameDisplay.innerText = 'Jane Appleseed'
  cardMonthDisplay.innerText = '00'
  cardYearDisplay.innerText = '00'
  cardCvcDisplay.innerText = '000'

  // clearErrorMsgs()
}

