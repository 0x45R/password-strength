const showPasswordButton = document.querySelector('.js-show-password-button');
const passwordInput = document.querySelector('.js-password-input');
const charCountLabel = document.querySelector('.js-char-count');
const crackTimeLabel = document.querySelector('.js-crack-time');
const scoreLabel = document.querySelector('.js-score');
const resultContainer = document.querySelector('.js-result');
const suggestionsLabel = document.querySelector('.js-suggestions-label');
const warningContainer = document.querySelector('.js-warning');

showPasswordButton.addEventListener('click',()=>{
  const passwordShown = passwordInput.getAttribute('type') == 'text';
  passwordInput.setAttribute('type', passwordShown ? 'password' : 'text');
  showPasswordButton.innerHTML = passwordShown ? "<i class='ti ti-eye-closed'></i>" : "<i class='ti ti-eye'></i>";

})
passwordInput.addEventListener('input',()=>{
  const password = passwordInput.value;
  charCountLabel.innerText = password.length;
  if(password.length > 0){
    resultContainer.classList.remove("hidden");
    const result = zxcvbn(password);

    const scoreLookup = ["very weak", "very weak", "weak", "good", "strong"]
    const score = scoreLookup[result.score];
    scoreLabel.innerText = score;
    if(!result.feedback.warning){
      warningContainer.setAttribute('hidden','');
    }else{
      warningContainer.removeAttribute('hidden');
    }
    warningContainer.innerHTML = result.feedback.warning;
    suggestionsLabel.innerHTML = result.feedback.suggestions.join(' ') || "No complaints...";

    crackTimeLabel.innerText = result.crack_times_display.offline_slow_hashing_1e4_per_second;
  }else{
    resultContainer.classList.add("hidden");
  }
})
