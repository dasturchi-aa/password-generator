const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

const passwordDisplay = document.querySelector('.bg-\\[\\#24232C\\] span');
const lengthCountEl = document.getElementById('lengthCount');
const rangeInputEl = document.getElementById('passwordLength');
const upper = document.getElementById('upper');
const lower = document.getElementById('lower');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const copyBtn = document.querySelector('button svg').parentElement;
const bars = document.querySelectorAll('.strength-bar');

let currentPassword = '';

lengthCountEl.textContent = rangeInputEl.value;

rangeInputEl.addEventListener('input', () => {
  lengthCountEl.textContent = rangeInputEl.value;
});

[upper, lower, numbers, symbols].forEach(ch => {
  ch.addEventListener('change', updateStrength);
});

function updateStrength() {
  let checked = 0;
  if (upper.checked) checked++;
  if (lower.checked) checked++;
  if (numbers.checked) checked++;
  if (symbols.checked) checked++;

  let strength = 0;

  if (checked >= 1) strength = 1;
  if (checked >= 2) strength = 2;
  if (checked >= 3) strength = 3;
  if (checked === 4) strength = 4;

  bars.forEach(bar => {
    bar.style.backgroundColor = 'transparent';
    bar.style.borderColor = 'white';
  });

  for (let i = 0; i < strength; i++) {
    if (strength === 1) bars[i].style.backgroundColor = '#F64A4A';
    if (strength === 2) bars[i].style.backgroundColor = '#FB7C58';
    if (strength === 3) bars[i].style.backgroundColor = '#F8CD65';
    if (strength === 4) bars[i].style.backgroundColor = '#A4FFAF';

    bars[i].style.borderColor = 'transparent';
  }
}

function generatePassword() {
  const length = parseInt(rangeInputEl.value);
  
  if (length === 0) {
    passwordDisplay.textContent = 'P4$5W0rD!';
    passwordDisplay.classList.add('opacity-55');
    return;
  }

  let charset = '';
  let password = '';

  if (upper.checked) charset += uppercaseChars;
  if (lower.checked) charset += lowercaseChars;
  if (numbers.checked) charset += numberChars;
  if (symbols.checked) charset += symbolChars;

  if (charset === '') {
    charset = uppercaseChars + lowercaseChars + numberChars + symbolChars;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  currentPassword = password;
  passwordDisplay.textContent = password;
  passwordDisplay.classList.remove('opacity-55');
}

function copyToClipboard() {
  if (currentPassword && currentPassword !== 'P4$5W0rD!') {
    navigator.clipboard.writeText(currentPassword).then(() => {
      copyBtn.style.color = '#ffffff';
      setTimeout(() => {
        copyBtn.style.color = '#A4FFAF';
      }, 500);
    });
  }
}

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);