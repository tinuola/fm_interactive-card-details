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

submitBtn.addEventListener('click', handleFormSubmit)


resetBtn.addEventListener('click', function(){
  resetApp()
  successElem.style.display = 'none'
  formElem.style.display = 'block'
})


// Clear error state
inputFields.forEach( field => {
  let errorField = field.nextElementSibling
  let hasErrorMsg = errorField.innerText
  
  if(hasErrorMsg){
    field.addEventListener('change', function() {
      errorField.innerText = ''
      errorField.classList.remove('error-state')
      field.classList.remove('error-input')
    })
  }
})


/***** Methods *****/
//

function handleFormSubmit(){
  let inputFieldValues = [
    cardUsername.value,
    cardNumber.value,
    expMonth.value,
    expYear.value,
    cardCvc.value
  ]

  let allFieldsHaveValidStatus = checkFields(inputFieldValues)

  if(allFieldsHaveValidStatus){
    displayData()
  } 
}


function checkFields(fields){
  let status = []

  fields.forEach( (value, index) => {
    let isValidData = validateData(value, index)
    let hasExtraWhiteSpace = /^\s{2,}$/.test(value)

    if (value === '' || hasExtraWhiteSpace){
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
  let regexArr = [
    `^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)$`, /* Full name */
    `^([0-9]){16}$`, /* 16-digits */
    `^([0][1-9])|[1][0-2]$`, /* 2-digit month*/
    `^([0-2][0-9])$`, /* 2-digit year */
    `^([0-9]){3}$` /* 3-digit cvc */
  ]

  let regex = new RegExp(regexArr[index])

  return regex.test(value)
}


function displayNoEmptyFieldError(index){
  let blankErrorMsg = `Can't be blank`
  applyErrorStyle (index)
  errorFields[index].innerText = blankErrorMsg
}


function displayInvalidDataError(index){
  let msgs = [
    `No symbols, characters, extra spaces, single names`,
    `Must be 16 digits, no spaces`,
    `Must be 2 digits: 00-12`,
    `Must be 2 digits: 00-29`,
    `Must be 3 digits`
  ]

  applyErrorStyle (index)
  errorFields[index].innerText = msgs[index]
}


function applyErrorStyle (index){
  inputFields[index].classList.add('error-input')
  errorFields[index].style.display = 'block'
  errorFields[index].classList.add('error-state')
}


function displayData(){
  cardNameDisplay.innerText = cardUsername.value
  cardNumberDisplay.innerText = sliceCardNumber(cardNumber.value)
  cardMonthDisplay.innerText = expMonth.value
  cardYearDisplay.innerText = expYear.value
  cardCvcDisplay.innerText = cardCvc.value

  formElem.style.display = 'none'
  successElem.style.display = 'block'
}


function sliceCardNumber(str){
  let slicedNum = ''

  for(let i=0; i< str.length; i+=4){
    let substr = str.substring(i, i+4)
    slicedNum += substr + ' '
  }

  return slicedNum.trimEnd()
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

