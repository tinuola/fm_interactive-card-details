// Container for input, display, error fields
const appData = []

// Buttons
let submitBtn = document.querySelector('#submit-btn')
let resetBtn = document.querySelector('#reset-btn')

// Sections
let formElem = document.querySelector('form')
let successElem = document.querySelector('.confirmation-container')

// Card Images
let cards = document.querySelectorAll('.card')



/**********************/
/** Event Listeners **/
/*********************/

window.addEventListener("load", setupAppData)

submitBtn.addEventListener('click', handleFormSubmit)

resetBtn.addEventListener('click', handleAppReset)



/***************************/
/** Functionality Methods **/
/***************************/

function setupAppData(){
  
  const inputFields = document.querySelectorAll('form input')

  // Get data attribute values from the input fields
  inputFields.forEach( (field, index) => {
    const dataAttr = field.getAttribute('data-field')

    const dataObj = {}

    dataObj.input = document.querySelector(`#${dataAttr}-input`)
    dataObj.output = document.querySelector(`#${dataAttr}-display`)
    dataObj.isInputValid = null

    switch(true){
      case index === 0:
        dataObj.error = `No characters, punctuations, numbers, or extra spaces \nNo more than four single names: (Jane Jan Smith Jones) \nMaximum of 25 alphabetical letters`
        break;
      case index === 1:
        dataObj.error = `Must be 16 digits, no spaces`
        break;
      case index === 2:
        dataObj.error = `Must be: 01-12`
        break
      case index === 3:
        dataObj.error = `Must be: 00-29`
        break;
      case index === 4:
        dataObj.error = `Must be 3 digits`
    }

    appData.push(dataObj)
  })

  runApp(appData)
}


/*  
 * Input Listeners - Validation/Logic:
 * Check for whitespace entries
 * Check that data is in correct format
 * Render error messages and states
 * Clear error messages and states when data is corrected 
*/
function runApp(appData){
  appData.forEach( (obj, index) => {
  
    obj.input.addEventListener('input', function(){
      let inputData = obj.input.value

      // Condition to handle spaced rendering of card number
      let cardLength = (inputData.length > 0 && inputData.length <= 16)

      switch(true){
        case index === 0:
          obj.input.maxLength = '25'
          obj.output.innerText = inputData
          break;
        case (index === 1 && cardLength):
          obj.input.maxLength = '16'
          obj.output.innerText = sliceCardNumber(inputData)
          break;
        case index === 2:
        case index === 3:
          obj.input.maxLength = '2' 
          obj.output.innerText = inputData
          break;
        case index === 4:
          obj.input.maxLength = '3'
          obj.output.innerText = inputData
          break;
        default: obj.output.innerText = inputData
      }
  
      let isInputDataValidated = validateInputData(index, inputData)
  
      let hasExtraWhiteSpace = /^\s{0,}$/.test(inputData)
  
      if(hasExtraWhiteSpace){
        applyErrorStyle(obj.input, `Can't be blank`)
        redisplayGenericContent(obj, index)
        obj.isInputValid = false
  
      } else if(!isInputDataValidated){
        applyErrorStyle(obj.input, obj.error)
        obj.isInputValid = false
      
      } else {
        removeErrorStyle(obj.input, '')
        obj.isInputValid = true
      }
    })
  })
}


function resetApp (){
  appData.forEach( (obj, index) => {
    obj.input.value = ''
    obj.isInputValid = null
    redisplayGenericContent(obj, index)
  })
}


function handleFormSubmit(){

  checkEmptyFields()

  let allFieldsHaveValidStatus = checkCompletedFields()

  if(allFieldsHaveValidStatus){
    formElem.style.display = 'none'
    successElem.style.display = 'block'
    runScaleAnimation()
  }
}


function handleAppReset(){
  resetApp()
  successElem.style.display = 'none'
  formElem.style.display = 'flex'
}



/*****************************/
/** Utility/Helper Methods **/
/****************************/

function validateInputData(index, str) {
  let regexArr = [
    // Regex for full name: Any string combination without 
    // numbers, symbols, punctuations; repeated up to four times;
    // max length of 25 letters 
    `^(?!.{26})[a-zA-Z-]+(?: [a-zA-Z]+(?: [a-zA-Z]+(?: [a-zA-Z-]+)?)?)?$`, 
    `^([0-9]){16}$`, /* 16-digits */
    `^([0][1-9])|[1][0-2]$`, /* 2-digit month*/
    `^([0-2][0-9])$`, /* 2-digit year */
    `^([0-9]){3}$` /* 3-digit cvc */
  ]

  let regex = new RegExp(regexArr[index])
  let isDataCorrect = regex.test(str);
  
  return isDataCorrect ? true : false;
}


function redisplayGenericContent(obj, index){
  switch(true){
    case index === 0:
      obj.output.innerText = `Jane Appleseed`
      break;
    case index === 1:
      obj.output.innerText = `0000 0000 0000 0000`
      break;
    case index === 2:
    case index === 3:
      obj.output.innerText = `00`
      break;
    case index === 4:
      obj.output.innerText = `000`
  }
}


function applyErrorStyle (inputField, msg){
  inputField.classList.add('error-input')
  inputField.nextElementSibling.classList.add('error-state')
  inputField.nextElementSibling.style.display = 'block'
  inputField.nextElementSibling.innerText = msg
}


function removeErrorStyle (inputField, msg){
  inputField.classList.remove('error-input')
  inputField.nextElementSibling.classList.remove('error-state')
  inputField.nextElementSibling.style.display = 'none'
  inputField.nextElementSibling.innerText = msg
}


/* Edge case: User tries to submit without any keyed data */
function checkEmptyFields(){
  appData.forEach( (obj) => {
    if(obj.input.value === ''){
      let blankErrorMsg = `Can't be blank`
      applyErrorStyle(obj.input, blankErrorMsg)

      obj.input.classList.add('shake')
      setTimeout(() => {
        obj.input.classList.remove('shake')
      }, 500)

    }
  })
}


function checkCompletedFields(){
  return appData.every( obj => obj.isInputValid === true )
}


function sliceCardNumber(str){
  let slicedNum = ''

  for(let i=0; i< str.length; i+=4){
    let substr = str.substring(i, i+4)
    slicedNum += substr + ' '
  }

  return slicedNum.trimEnd()
}


function runScaleAnimation(){
  cards.forEach( card => {
    setTimeout(() => {
      card.classList.add('scale')
    }, 100)

    setTimeout(() => {
      card.classList.remove('scale')
    }, 1000)
  })
}
