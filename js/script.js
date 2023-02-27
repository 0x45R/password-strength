const passwordInput = document.querySelector('.password-input');
const passwordCharacters = document.querySelector('.password-characters')

const passwordSuggestions = document.querySelector('.password-suggestions')
const passwordStrength = document.querySelector('.password-strength')
const passwordCrackTime = document.querySelector('.password-time-to-crack')

const scoreLookup = ["very weak", "very weak", "weak", "good", "strong"]

const parsePassword = (password) =>{
  let passwordEstimation = zxcvbn(password)
  console.log(passwordEstimation)

  passwordCharacters.innerText = password.length;

  passwordStrength.innerText = scoreLookup[passwordEstimation.score]
  passwordCrackTime.innerText = passwordEstimation.crack_times_display.offline_slow_hashing_1e4_per_second

  if(passwordEstimation.feedback.suggestions.length != 0){
    passwordSuggestions.innerHTML = passwordEstimation.feedback.suggestions.join("<br>");
  }
  else{
    passwordSuggestions.innerText = "No suggestions for now!"
  }
}

parsePassword("");

passwordInput.addEventListener("input", (e)=>{
  const password = e.target.value;
  parsePassword(password)
})


