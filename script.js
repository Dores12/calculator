let numbers = [];  // Pole na čísla
let currentInput = "";  // Aktuálne zadávané číslo
let operator = "";  // Aktuálny operátor
let equalButton = null;
let lastButton = null;

 const resultDisplay = document.querySelector(".result");
const inputDisplay = document.querySelector(".input");



document.querySelector(".buttons").addEventListener("click", function(event) {

    if (event.target.tagName === "BUTTON") {
        let value = event.target.textContent;


        if (!isNaN(value)) { 
            // Ak je číslo alebo desatinná čiarka, pridáme ho do currentInput
            if (lastButton === equalButton) reset() // Ak po stalčení = nenasleduje nejaký operátor, resetujeme kalkulačku
            currentInput += value;
            console.log("Zadávané číslo:", currentInput);
            inputDisplay.textContent += value;
        } else if (value === "," || value === ".") {
            if (!currentInput.includes(".")) {
                currentInput += "."
                inputDisplay.textContent += value;
            }
        } else if (value === "=") {
            // Ak stlačíme "=", vykonáme výpočet
            if (currentInput !== "") numbers.push(parseFloat(currentInput)); // Uložíme posledné číslo
            let result = calculate(numbers, operator);
            inputDisplay.textContent = "";
            resultDisplay.textContent = result;
            console.log("Výsledok:", result);
            continueCalculator(result); // Resetujeme kalkulačku s výsledkom aby sme vedeli pokračovať ďalej
            equalButton = value; 
        } else if (value === "C") {
            // Ak stlačíme "C" tak úplne resetujeme kalkulačku a všetky hodnoty
            reset()
        } else {
            // Ak je to operátor (+, -, *, /)

            // Nepovoli vložiť 2 rovnaké operátory za sebou
            if (lastButton === value )
                return
        
            if (operator !== "" && currentInput !== "") {
                numbers.push(parseFloat(currentInput));
                let result = calculate(numbers, operator);
                console.log("Priebežný výsledok:", result);
                numbers = [result]; // Uložíme výsledok ako prvé číslo
                operators = []; // Resetujeme operátory
                currentInput = "";
            }

            else if (currentInput !== "") {
                numbers.push(parseFloat(currentInput)); // Uložíme číslo
                currentInput = ""; // Resetujeme currentInput
                
            }
            operator = value; // Uložíme operátor
            console.log("Uložené hodnoty:", numbers, "Operátor:", operator);

            inputDisplay.textContent += value;
        }
        
        lastButton = value;
    }
    
});

// Funkcia na výpočet výsledku
function calculate(numbers, operator) {
    if (numbers.length < 2) return numbers[0] || 0; // Ak máme iba jedno číslo, vrátime ho

    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        switch (operator) {
            case "+": result += numbers[i]; break;
            case "-": result -= numbers[i]; break;
            case "X": result *= numbers[i]; break;
            case "/": result /= numbers[i]; break;
        }
    }
    return result;
}

// Reset kalkulačky s možnosťou pokračovať s výsledkom
function continueCalculator(result) {
    numbers = [result];
    currentInput = "";
    operator = "";
}

// Úplny reset kalkulačky

function reset() {
    numbers = [];
    currentInput = "";
    operator = "";
    inputDisplay.textContent = "";
    resultDisplay.textContent = "";
}

// Update displeja


