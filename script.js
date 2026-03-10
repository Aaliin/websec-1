const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const operator = document.getElementById('operator');
const btn = document.getElementById('calcBtn');
const historyDiv = document.getElementById('history');

let history = [
    { text: '123 * 567 = 69741', bright: false },
    { text: '123 + 567 = 690', bright: true }
];

function updateHistory() {
    let html = '';
    for (let i = 0; i < history.length; i++) {
        const className = history[i].bright ? 'bright' : 'pale';
        html += `<div class="history-entry ${className}">${history[i].text}</div>`;
    }
    historyDiv.innerHTML = html;
}

updateHistory();

function isValidNumber(str) {
    if (str.trim() === '') return false;
    return /^-?\d*\.?\d+$/.test(str);
}

function getErrorMessage(str) {
    if (str.trim() === '') return 'Поле пустое';
    if (!/^-?\d*\.?\d+$/.test(str)) return 'Только цифры, точка и минус';
    return 'Неверное число';
}

function calculate() {
    let hasError = false;
    
    if (!isValidNumber(num1.value)) {
        num1.classList.add('error');
        hasError = true;
    } else {
        num1.classList.remove('error');
    }
    
    if (!isValidNumber(num2.value)) {
        num2.classList.add('error');
        hasError = true;
    } else {
        num2.classList.remove('error');
    }
    
    if (hasError) {
        let errorMsg = '';
        if (num1.classList.contains('error')) {
            errorMsg = 'Ошибка: ' + getErrorMessage(num1.value);
        } else {
            errorMsg = 'Ошибка: ' + getErrorMessage(num2.value);
        }
        
        history = [{ text: errorMsg, bright: true }];
        updateHistory();
        
        setTimeout(() => {
            history = [
                { text: '123 * 567 = 69741', bright: false },
                { text: '123 + 567 = 690', bright: true }
            ];
            updateHistory();
        }, 2000);
        return;
    }
    
    const a = parseFloat(num1.value);
    const b = parseFloat(num2.value);
    const op = operator.value;
    
    if (op === '/' && b === 0) {
        num2.classList.add('error');
        
        history = [{ text: 'Ошибка: деление на ноль', bright: true }];
        updateHistory();
        
        setTimeout(() => {
            history = [
                { text: '123 * 567 = 69741', bright: false },
                { text: '123 + 567 = 690', bright: true }
            ];
            updateHistory();
        }, 2000);
        return;
    }
    
    let result;
    switch(op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = a / b; break;
    }
    
    const resultStr = Number.isInteger(result) ? result : parseFloat(result.toFixed(8)).toString();
    const operation = `${num1.value} ${op} ${num2.value} = ${resultStr}`;
    
    for (let i = 0; i < history.length; i++) {
        history[i].bright = false;
    }
    history.push({ text: operation, bright: true });
    if (history.length > 5) history.shift();
    
    updateHistory();
}

btn.addEventListener('click', calculate);

num1.addEventListener('input', () => num1.classList.remove('error'));
num2.addEventListener('input', () => num2.classList.remove('error'));

num1.addEventListener('focus', () => num1.classList.remove('error'));
num2.addEventListener('focus', () => num2.classList.remove('error'));