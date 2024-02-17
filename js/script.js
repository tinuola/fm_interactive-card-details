// Card data input
let cardUsername = document.querySelector('#card-name-input')
let cardNumber = document.querySelector('#card-number-input')
let cardMonth = document.querySelector('#card-month-input')
let cardYear = document.querySelector('#card-year-input')
let cardCvc = document.querySelector('#card-cvc-input')

// Card data display
let cardNumberDisplay = document.querySelector('#card-number-display')
let cardUsernameDisplay = document.querySelector('#card-name-display')
let cardMonthDisplay = document.querySelector('#card-month-display')
let cardYearDisplay = document.querySelector('#card-year-display')
let cardCvcDisplay = document.querySelector('#card-cvc-display')

// Buttons
let submitBtn = document.querySelector('#submit-btn')
let resetBtn = document.querySelector('#reset-btn')

// Error messages
let errorFields = document.querySelectorAll('.error-text')

// Sections
let formElem = document.querySelector('form')
let successElem = document.querySelector('.confirmation-container')

// const inputFields = [
//   cardUsername,
//   cardNumber,
//   cardMonth,
//   cardYear,
//   cardCvc
// ]

const appData = [
  { input: cardUsername,
    output: cardUsernameDisplay,
    error: `No symbols, characters, extra spaces`,
    isInputValid: null
  },
  { input: cardNumber,
    output: cardNumberDisplay,
    error: `Must be 16 digits, no spaces`,
    isInputValid: null
  },
  { input: cardMonth,
    output: cardMonthDisplay,
    error: `Must be: 01-12`,
    isInputValid: null
  },
  { input: cardYear,
    output: cardYearDisplay,
    error: `Must be: 00-29`,
    isInputValid: null
  },
  { input: cardCvc,
    output: cardCvcDisplay,
    error: `Must be 3 digits`,
    isInputValid: null
  },
]

/***** Event Listeners *****/
//

submitBtn.addEventListener('click', handleFormSubmit)


resetBtn.addEventListener('click', handleAppReset)


appData.forEach( (obj, index) => {
  obj.input.addEventListener('input', function(){
    
    let inputData = obj.input.value

    if(index === 1 && (inputData.length > 0 && inputData.length <= 16) ){
      obj.output.innerText = sliceCardNumber(inputData)
      obj.input.maxLength = '16'
    } else {
      obj.output.innerText = inputData
    }

    let test = validatePattern(index, inputData)

    let hasExtraWhiteSpace = /^\s{0,}$/.test(inputData)

    if(hasExtraWhiteSpace){
      // console.log('empty')
      obj.input.nextElementSibling.innerText = `Can't be blank`
      applyErrorStyle(obj.input)
      obj.isInputValid = false
    } else if(!test){
      obj.input.nextElementSibling.innerText = obj.error
      applyErrorStyle(obj.input)
      obj.isInputValid = false
    } else {
      obj.input.nextElementSibling.innerText = ''
      removeErrorStyle(obj.input)
      obj.isInputValid = true
    }
  })
})


// Clear error state
// inputFields.forEach( field => {
//   let errorField = field.nextElementSibling

//   field.addEventListener('change', function() {
//     let hasErrorMsg = errorField.innerText
//     if(hasErrorMsg){
//       errorField.innerText = ''
//       errorField.classList.remove('error-state')
//       field.classList.remove('error-input')
//     }
//   })
// })


/***** Methods *****/
//

function validatePattern(index, str) {
  let regexArr = [
    `^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)$`, /* Full name */
    `^([0-9]){16}$`, /* 16-digits */
    `^([0][1-9])|[1][0-2]$`, /* 2-digit month*/
    `^([0-2][0-9])$`, /* 2-digit year */
    `^([0-9]){3}$` /* 3-digit cvc */
  ]

  let regex = new RegExp(regexArr[index])

  let isDataCorrect = regex.test(str);
  return isDataCorrect ? true : false;
}


function applyErrorStyle (field){
  field.classList.add('error-input')
  field.nextElementSibling.style.display = 'block'
  field.nextElementSibling.classList.add('error-state')
}


function removeErrorStyle (field){
  field.classList.remove('error-input')
  field.nextElementSibling.style.display = 'none'
  field.nextElementSibling.classList.remove('error-state')
}


function checkEmptyFields(){
  appData.forEach( (obj, index) => {
    if(obj.input.value === ''){
      
      let blankErrorMsg = `Can't be blank`
      obj.input.nextElementSibling.style.display = 'block'
      // apply style
      errorFields[index].style.color = 'red'
      errorFields[index].innerText = blankErrorMsg
      obj.isInputValid === false
    }
  })
}


function checkFields(){
  // let status = []

  return appData.every( obj => obj.isInputValid === true )

  // fields.forEach( (value, index) => {
  //   let isValidData = validateData(value, index)
  //   let hasExtraWhiteSpace = /^\s{2,}$/.test(value)

  //   if (value === '' || hasExtraWhiteSpace){
  //     displayNoEmptyFieldError(index)
  //     status.push(false)
  //   } else if (!isValidData){
  //     displayInvalidDataError(index)
  //     status.push(false)
  //   } else {
  //     status.push(true)
  //   }
  // })

  // return status.every( entry => entry === true )
}


// function validateData(value, index){
//   let regexArr = [
//     `^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)$`, /* Full name */
//     `^([0-9]){16}$`, /* 16-digits */
//     `^([0][1-9])|[1][0-2]$`, /* 2-digit month*/
//     `^([0-2][0-9])$`, /* 2-digit year */
//     `^([0-9]){3}$` /* 3-digit cvc */
//   ]

//   let regex = new RegExp(regexArr[index])

//   return regex.test(value)
// }


// function displayNoEmptyFieldError(index){
//   let blankErrorMsg = `Can't be blank`
//   applyErrorStyle (index)
//   errorFields[index].innerText = blankErrorMsg
// }


// function displayInvalidDataError(index){
//   let msgs = [
//     `No symbols, characters, extra spaces`,
//     `Must be 16 digits, no spaces`,
//     `Must be: 01-12`,
//     `Must be: 00-30`,
//     `Must be 3 digits`
//   ]

//   applyErrorStyle (index)
//   errorFields[index].innerText = msgs[index]
// }


// function applyErrorStyle (index){
//   inputFields[index].classList.add('error-input')
//   errorFields[index].style.display = 'block'
//   errorFields[index].classList.add('error-state')
// }


// function displayData(){
  // cardUsernameDisplay.innerText = cardUsername.value
  // cardNumberDisplay.innerText = sliceCardNumber(cardNumber.value)
  // cardMonthDisplay.innerText = cardMonth.value
  // cardYearDisplay.innerText = cardYear.value
  // cardCvcDisplay.innerText = cardCvc.value

  // formElem.style.display = 'none'
  // successElem.style.display = 'block'
// }


function sliceCardNumber(str){
  let slicedNum = ''

  for(let i=0; i< str.length; i+=4){
    let substr = str.substring(i, i+4)
    slicedNum += substr + ' '
  }

  return slicedNum.trimEnd()
}


function resetApp (){
  // cardUsername.value = ''
  // cardNumber.value = '' 
  // cardMonth.value = '' 
  // cardYear.value = '' 
  // cardCvc.value = ''
  cardNumberDisplay.innerText = '0000 0000 0000 0000'
  cardUsernameDisplay.innerText = 'Jane Appleseed'
  cardMonthDisplay.innerText = '00'
  cardYearDisplay.innerText = '00'
  cardCvcDisplay.innerText = '000'

  appData.forEach( obj => {
    // console.log(obj.isInputValid)
    obj.input.value = ''
    obj.isInputValid = null
    // console.log(obj.isInputValid, obj.output)
    // console.log(obj.isInputValid)
  })
}


function handleFormSubmit(){
  // let inputFieldValues = [
  //   cardUsername.value,
  //   cardNumber.value,
  //   cardMonth.value,
  //   cardYear.value,
  //   cardCvc.value
  // ]

  checkEmptyFields()

  let allFieldsHaveValidStatus = checkFields()
  // console.log(allFieldsHaveValidStatus)


  if(allFieldsHaveValidStatus){
    formElem.style.display = 'none'
    successElem.style.display = 'block'
  } 
}


function handleAppReset(){
  resetApp()
  successElem.style.display = 'none'
  formElem.style.display = 'block'
}




