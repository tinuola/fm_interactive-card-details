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

- Good project to practice building custom form validation, especially the validation on input logic
- Finding a regex pattern that could account for the many ways a fullname can be constructed was difficult; the current pattern throws an error if firstname starts with a lowercase; _(to be fixed)_
- Good use case for ways to enhance UI-UX: stronger visual cues (animation) for form states
- Challenge was also project #2 of *[GDI's](https://girldevelopit.com/) Frontend Projects (Beginner) Workshop* mini-cohort in February 2024
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
- Regular Expressions [[1](https://stackoverflow.com/a/68896296), [2](https://regexpattern.com/whitespace-between-words/), [3](https://regex101.com/)]
- [Hide Arrows from Input Number](https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp) _(W3Schools)_
- [CSS Shake Animation](https://css-tricks.com/snippets/css/shake-css-keyframe-animation/) _(CSS Tricks)_

_Visit my [Frontend Mentor profile](https://www.frontendmentor.io/profile/tinuola) to view other challenges I've completed!_
