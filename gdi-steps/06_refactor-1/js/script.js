/*  
 * Step 06 - Refactoring
 * Display data on cards on input
 * Create reusable data structure by moving all app fields into an array
 * - This cleans up proliferation of variable names
 * Update methods to handle validation on input 
 * 
 * Addendum - Small bug:
 * When data is entered incorrectly and cleared, the placeholder displayed
 * on the card image is also cleared.
 */


// Input, Display, Error fields
const appData = [
  { input: document.querySelector('#card-name-input'),
    output: document.querySelector('#card-name-display'),
    error: `No symbols, characters, extra spaces`,
    isInputValid: null
  },
  { input: document.querySelector('#card-number-input'),
    output: document.querySelector('#card-number-display'),
    error: `Must be 16 digits, no spaces`,
    isInputValid: null
  },
  { input: document.querySelector('#card-month-input'),
    output: document.querySelector('#card-month-display'),
    error: `Must be: 01-12`,
    isInputValid: null
  },
  { input: document.querySelector('#card-year-input'),
    output: document.querySelector('#card-year-display'),
    error: `Must be: 00-29`,
    isInputValid: null
  },
  { input: document.querySelector('#card-cvc-input'),
    output: document.querySelector('#card-cvc-display'),
    error: `Must be 3 digits`,
    isInputValid: null
  },
]

// Buttons
let submitBtn = document.querySelector('#submit-btn')
let resetBtn = document.querySelector('#reset-btn')

// Sections
let formElem = document.querySelector('form')
let successElem = document.querySelector('.confirmation-container')



/***** Event Listeners *****/

/*  
 * Input Listeners - Validation/Logic:
 * Check for whitespace entries
 * Check that data is in correct format
 * Render error messages and states
 * Clear error messages and states when data is corrected 
*/
appData.forEach( (obj, index) => {

  obj.input.addEventListener('input', function(){
    
    let inputData = obj.input.value

    // Logic to handle spaced rendering of card number
    let cardLength = (inputData.length > 0 && inputData.length <= 16)

    if(index === 1 && cardLength){
      obj.output.innerText = sliceCardNumber(inputData)
      obj.input.maxLength = '16'
    } else {
      // Display other fields as entered
      obj.output.innerText = inputData
    }

    let isInputDataValidated = validateInputData(index, inputData)

    let hasExtraWhiteSpace = /^\s{0,}$/.test(inputData)

    if(hasExtraWhiteSpace){
      applyErrorStyle(obj.input, `Can't be blank`)
      obj.isInputValid = false

    } else if(!isInputDataValidated){
      // Add field specific error message
      applyErrorStyle(obj.input, obj.error)
      obj.isInputValid = false
    
    } else {
      // Input is valid
      removeErrorStyle(obj.input, '')
      obj.isInputValid = true
    }
  })
})

submitBtn.addEventListener('click', handleFormSubmit)

resetBtn.addEventListener('click', handleAppReset)


/***** Methods *****/

function validateInputData(index, str) {
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


function resetApp (){
  appData.forEach( (obj, index) => {
    obj.input.value = ''
    obj.isInputValid = null

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
  })
}


function handleFormSubmit(){

  checkEmptyFields()

  let allFieldsHaveValidStatus = checkCompletedFields()

  if(allFieldsHaveValidStatus){
    formElem.style.display = 'none'
    successElem.style.display = 'block'
  } 
}


function handleAppReset(){
  resetApp()
  successElem.style.display = 'none'
  formElem.style.display = 'flex'
}
