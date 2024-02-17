/*
 * Step 02 - Starter JS
 */


// Card data input
let cardUsername = document.querySelector('#card-name-input')
let cardNumber = document.querySelector('#card-number-input')
let expMonth = document.querySelector('#card-month-input')
let expYear = document.querySelector('#card-year-input')
let cardCvc = document.querySelector('#card-cvc-input')
// console.log(cardUsername, cardNumber, expMonth, expYear, cardCvc) 

// Buttons
let submitBtn = document.querySelector('#submit-btn')
let resetBtn = document.querySelector('#reset-btn')
// console.log(submitBtn, resetBtn)

// Error messages
let errorFields = document.querySelectorAll('.error-text')
// console.log(errorFields) // 5

// Sections
let formElem = document.querySelector('form')
let successElem = document.querySelector('.confirmation-container')
// console.log(formElem, successElem)

// Card data display
let cardNumberDisplay = document.querySelector('#card-number-display')
let cardNameDisplay = document.querySelector('#card-name-display')
let cardMonthDisplay = document.querySelector('#card-month-display')
let cardYearDisplay = document.querySelector('#card-year-display')
let cardCvcDisplay = document.querySelector('#card-cvc-display')
// console.log(cardNumberDisplay, cardNameDisplay, cardMonthDisplay, cardYearDisplay, cardCvcDisplay)


// Event Listeners
submitBtn.addEventListener('click', function(){
  // console.log('Hello')

  cardNameDisplay.innerText = cardUsername.value
  cardNumberDisplay.innerText = cardNumber.value
  cardMonthDisplay.innerText = expMonth.value
  cardYearDisplay.innerText = expYear.value
  cardCvcDisplay.innerText = cardCvc.value

  formElem.style.display = 'none'
  successElem.style.display = 'block'
})


resetBtn.addEventListener('click', function(){
  // console.log('Goodbye')

  resetApp()
  successElem.style.display = 'none'
  formElem.style.display = 'block'
})


// Methods
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