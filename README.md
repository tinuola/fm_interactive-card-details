# Frontend Mentor: Interactive Card Details Form

Solution to the _[Interactive Card Details Form](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw)_ challenge on Frontend Mentor.

### Challenge

- Build out a interactive card details form using provided [desktop](/assets/design/desktop-design.jpg) and [mobile](/assets/design/mobile-design.jpg) designs
- Users should be able to:
  - Fill in the form and see the card details update in real-time
  - Receive [error](/assets/design/) messages when the form is submitted if:
    - Any input field is empty
    - The card number, expiry date, or CVC fields are in the wrong format
  - View the optimal layout depending on their device's screen size
  - See [hover, active, and focus states](/assets/design/active-states.jpg) for interactive elements on the page
  - See a [completed/success page](/assets/design/complete-state-desktop.jpg) and reset the from

### Solution

Live Site: [tinuola.github.io/fm_interactive-card-details](https://tinuola.github.io/fm_interactive-card-details/)

### Retrospective

- A good project to practice building custom form validation, especially the logic/sequence for validating input as it's typed, and then updating the form and display states as input is corrected
- A regex pattern that can account for the many ways a fullname can be constructed is non-existent? 🤷🏽‍♀️ - The simplest and least tedious approach, though definitely not inclusive, was to default to alphabetical character-only input (no more than a single blank space between names) up to a specific length
- A good case for using animation (e.g., card movements) to enhance visual interest or UI-UX
- Challenge was project #2 of *[GDI's](https://girldevelopit.com/) Frontend Projects (Beginner) Workshop* mini-cohort in February 2024 that I faciliated
  - Code implementation of the [project's phases/steps](https://docs.google.com/document/d/1RS8ger3OMobcRFmZ4Q-MYCY720ZdVzY3VKQ3kzRMUdU/edit?usp=sharing) are archived in the **[gdi-steps](/gdi-steps/)** folder

### Enhancement(s)

- ~~Validate on input~~
- ~~Animate on submit error and submit success~~
- Improve screen reader accessibility
  - Announce: error and success states (Use `_aria-live_`?)

### Tools & Resources

- HTML, CSS, JavaScript
- CSS Resets
- CSS Positioning
- Regular Expressions
  - Modified: [Regex to validate full name](https://stackoverflow.com/a/63307042) _(Stack Overflow)_
- [Hide Arrows from Input Number](https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp) _(W3Schools)_
- [CSS Shake Animation](https://css-tricks.com/snippets/css/shake-css-keyframe-animation/) _(CSS Tricks)_

_Visit my [Frontend Mentor profile](https://www.frontendmentor.io/profile/tinuola) to view other challenges I've completed!_
