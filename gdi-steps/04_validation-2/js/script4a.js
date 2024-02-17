/*
 * Step 04a - Data validation:
 * Simple regex validation
 * Move error display logic into checkFields()
 * Move data submission function out of event-listener
 * Refactor error msgs display, styling into smaller functions
 */


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

/***** Event Listeners *****/
//

// Refactored submit handler
submitBtn.addEventListener('click', handleFormSubmit)


resetBtn.addEventListener('click', function(){
  resetApp()
  successElem.style.display = 'none'
  formElem.style.display = 'block'
})


inputFields.forEach( field => {
  let errorField = field.nextElementSibling
  let hasErrorMsg = errorField.innerText
  
  if(hasErrorMsg){
    field.addEventListener('change', function() {
      field.nextElementSibling.innerText = ''
    })
  }
})


/***** Methods *****/
//

function handleFormSubmit(){
  // Store data from input fields
  let inputFieldValues = [
    cardUsername.value,
    cardNumber.value,
    expMonth.value,
    expYear.value,
    cardCvc.value
  ]

  // Check if input data exists and is valid in all fields
  let allFieldsHaveValidStatus = checkFields(inputFieldValues)
  // console.log(allFieldsHaveValidStatus)

  if(allFieldsHaveValidStatus){
    displayData()
  } 
}


// Let checkFields handle error msg display
function checkFields(fields){
  // console.log(fields)
  let status = []

  fields.forEach( (value, index) => {
    let isValidData = validateData(value, index)
    // console.log(isValidData)
    let isWhiteSpace = /\s*$/.test(value)

    if (value === '' || isWhiteSpace){
      displayNoEmptyFieldError(index)
      status.push(false)
    } else if (!isValidData){
      displayInvalidDataError(index)
      status.push(false)
    } else {
      status.push(true)
    }
  })

  return status.every( entry => entry === true )
}


function validateData(value, index){
  // console.log(typeof value)
  let regexArr = [
    `(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)`,
    `^[0-9]{3}$`,
    `^[0-9]{2}$`,
    `^[0-9]{2}$`,
    `^[0-9]{3}$`
  ]

  let regex = new RegExp(regexArr[index])

  return regex.test(value)
}


function displayNoEmptyFieldError(index){
  // console.log(inputFieldValues)
  
  let blankErrorMsg = `Can't be blank`
  applyErrorStyle (index)
  errorFields[index].innerText = blankErrorMsg
}


function displayInvalidDataError(index){
  // console.log(inputFieldValues)
  
  let msgs = [
    `No symbols or special characters`,
    `Wrong format, must be 16 digits only`,
    `Must be 2 digits`,
    `Must be 2 digits`,
    `Must be 3 digits`
  ]
  applyErrorStyle (index)
  errorFields[index].innerText = msgs[index]
}


function applyErrorStyle (index){
  errorFields[index].style.display = 'block'
  errorFields[index].style.color = 'red'
}


function displayData(){
  cardNameDisplay.innerText = cardUsername.value
  cardNumberDisplay.innerText = cardNumber.value
  cardMonthDisplay.innerText = expMonth.value
  cardYearDisplay.innerText = expYear.value
  cardCvcDisplay.innerText = cardCvc.value

  formElem.style.display = 'none'
  successElem.style.display = 'block'
}


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
}

