const calculator = {
    displayValue: '0',
    firstOperand: null,
    watingTheSecondOperand: false,
    operator: null
}

function updateDisplay() {
    // select the element with a class *calculator_display*
    const display = document.querySelector('.calculator_display');
    // update the value of the element with a calculator content
    display.textContent = calculator.displayValue;
}
updateDisplay();


function inputDigit(digit) {
    // Select the displayValue Propery form calculator object
    const { displayValue,watingTheSecondOperand } = calculator;
    // check if displayValue property is equal to '0'
    // update the displayValue with a digit
    // Otherwise, append a new digit after the previous digit
    if (watingTheSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.watingTheSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (calculator.watingTheSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.watingTheSecondOperand = false;
        return;
    }
    
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.watingTheSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.watingTheSecondOperand = true;
    calculator.operator = nextOperator;
}


function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand
}


function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.watingTheSecondOperand = false;
    calculator.operator = null;
}



const keys = document.querySelector('.calculator_keys');

console.log(history);
keys.addEventListener('click', event => {
    // Normal way
    // const target = event;
    
    // OR via Destructing way
    const { target } = event;
    const { value } = target
    
    if (!target.matches('button')) {
        return;
    }

    switch(value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear': 
            resetCalculator();
            break;
        default:
            inputDigit(value);    
    }

    updateDisplay();
})
