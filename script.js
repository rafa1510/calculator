function display(number)
{
    let displayBox = document.querySelector(".display");
    displayBox.textContent = number.toString();
}

function add(numOne, numTwo)
{
    return numOne + numTwo;
}

function subtract(numOne, numTwo)
{
    return numOne - numTwo;
}

function multiply(numOne, numTwo)
{
    return numOne * numTwo;
}

function divide(numOne, numTwo)
{
    if (numTwo == 0)
    {
        return Infinity;
    }
    return numOne / numTwo;
}

function operate(numOne, numTwo, operator)
{
    if (operator == "+")
    {
        return add(numOne, numTwo);
    }
    else if (operator == "-")
    {
        return subtract(numOne, numTwo);
    }
    else if (operator == "*")
    {
        return multiply(numOne, numTwo);
    }
    else if (operator == "/")
    {
        return divide(numOne, numTwo);
    }
}

// Display the chosen number
let currentDisplay = "";
let numberButtons = document.querySelectorAll(".numbers");
numberButtons.forEach((number) => 
{
    number.addEventListener("click", () => 
    {
        currentDisplay += number.textContent;
        display(currentDisplay);
    });
})

// Store last chosen operator in chosenOperator and add the currentDisplay to chosenNumbers array
let operatorButtons = document.querySelectorAll(".operators");
operatorButtons.forEach((operator) => 
{
    operator.addEventListener("click", () => 
    {
        // This is here so that we don't push no numbers into the chosenNumbers array
        if (currentDisplay != "" && currentDisplay != NaN)
        {
            chosenNumbers.push(parseInt(currentDisplay));
        }

        // Perform operation if there was already an operator clicked & there are numbers in the chosenNumbers array
        if (chosenOperator != "" && chosenNumbers.length == 2)
        {
            let result = operate(chosenNumbers[0], chosenNumbers[1], chosenOperator);
            let roundedResult = Math.round(result * 100) / 100;
            // Display result from calling operate
            if (chosenOperator == "/" && chosenNumbers[1] == 0)
            {
                display("lol")
            }
            else
            {
                display(roundedResult);
                chosenNumbers.splice(0, chosenNumbers.length, parseInt(result));
            }
            // Clear currentDisplay, chosenNumbers, chosenOperator to make space for the next operation
            currentDisplay = "";
            chosenOperator = "";
        }

        chosenOperator = operator.textContent;

        // Clear currentDisplay to make way for new numbers
        currentDisplay = "";
    })
})

// Array that stores the numbers we are going to operate on
let chosenNumbers = [];
// Variable holding user's last chosen operator
let chosenOperator = "";

// Call operate() function with two numbers and an operator once equal's button is pressed
let equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => 
{
    // Makes sure that there are numbers in the chosenNumbers array & that there's an operator
    if (chosenNumbers.length != 0 && chosenOperator != "")
    {
        // Add in second number to chosenNumbers array, since it's not being added by clicking an operator
        if (currentDisplay != NaN)
        {
            chosenNumbers.push(parseInt(currentDisplay));
        }
        let result = operate(chosenNumbers[0], chosenNumbers[1], chosenOperator);
        let roundedResult = Math.round(result * 100) / 100;
        // Display result from calling operate
        if (chosenOperator == "/" && chosenNumbers[1] == 0)
        {
            display("lol")
        }
        else
        {
            display(roundedResult);
        }
        // Clear currentDisplay, chosenNumbers, chosenOperator to make space for the next operation
        currentDisplay = "";
        chosenNumbers.splice(0, chosenNumbers.length, parseInt(result));
        chosenOperator = "";
    }
})

// Clear button will clear all data to start from scratch
let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => 
{
    currentDisplay = "";
    display(0);
    chosenNumbers.splice(0, chosenNumbers.length);
    chosenOperator = "";
})