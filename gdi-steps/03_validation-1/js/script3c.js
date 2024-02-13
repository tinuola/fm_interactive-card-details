// Step 03c - Simple validation: Show blank error for specific empty field

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
submitBtn.addEventListener('click', function(){

  // Store input data if it exists
  let inputFieldValues = [
    cardUsername.value,
    cardNumber.value,
    expMonth.value,
    expYear.value,
    cardCvc.value
  ]

  // Check if input data exists in all fields
  let fieldsCompletedStatus = checkFields(inputFieldValues)

  if(fieldsCompletedStatus){
    displayData()
  } else {
    displayErrorMsgs(inputFieldValues)
  }
})


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
function displayData(){
  cardNameDisplay.innerText = cardUsername.value
  cardNumberDisplay.innerText = cardNumber.value
  cardMonthDisplay.innerText = expMonth.value
  cardYearDisplay.innerText = expYear.value
  cardCvcDisplay.innerText = cardCvc.value

  formElem.style.display = 'none'
  successElem.style.display = 'block'
}


function checkFields(fields){
  // console.log(fields)

  return fields.every( value => value !== '')
}


function displayErrorMsgs(fields){
  // console.log(inputFieldValues)
  
  let blankErrorMsg = `Can't be blank`

  fields.forEach( (value, index) => {
    if(!value){
      // console.log(blankErrorMsg)

      errorFields[index].style.display = 'block'
      errorFields[index].innerText = blankErrorMsg
      errorFields[index].style.color = 'red'
    }
  })

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

