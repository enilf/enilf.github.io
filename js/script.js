/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
    let button = document.getElementsByTagName("button");
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner


    // kollar om sifferknapp är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addDigit(digit);
    }
    else if (btn === 'clear') {
        clearLCD();
        whiteBackground();
    }
    else if (btn === 'enter') {
        calculate();
        whiteBackground();
    }
    else if (btn === 'comma') {
        addComma('.');
    }
    else {
        setOperator(btn, lcd.value);
        backGround(btn);
    }
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    lcd.value = lcd.value + digit;
}

/**
 * Lägger till decimaltecken
 */
function addComma(comma) {

    if (lcd.value.includes('.')) {
        console.log('1')
    }
    else {
        lcd.value = lcd.value + comma;
    }

}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator, siffra) {
    arithmetic = operator;
    memory = siffra;
    clearLCD();
}

/**
 * Beräknar och visar resultatet på displayen.
 */
function calculate() {

    let decAmount = 0;
    console.log(memory);

    /* Kollar antal decimaler */
    while (lcd.value % 1 != 0 || memory % 1 != 0) {
        lcd.value *= 10;
        memory *= 10;
        decAmount++;
    }

    console.log(lcd.value);
    console.log(memory);


    if (arithmetic === 'add') {
        lcd.value = (+memory + +lcd.value) / Math.pow(10, decAmount);
    }
    else if (arithmetic === 'sub') {
        lcd.value = (memory - lcd.value) / Math.pow(10, decAmount);
    }
    else if (arithmetic === 'mul') {
        lcd.value = (memory * lcd.value) / Math.pow(10, 2 * decAmount);
    }
    else if (arithmetic === 'div') {
        lcd.value = memory / lcd.value;
    }

}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;
}

/** Rensar allt, reset */
function memClear() {
    memory = 0;
    arithmetic = null;
    clearLCD();
}

function backGround(operator) {
    whiteBackground();

    if (operator === "add") {
        document.getElementById("add").style.backgroundColor = "lightgray"
    }
    else if (operator === "sub") {
        document.getElementById("sub").style.backgroundColor = "lightgray"
    }
    else if (operator === "mul") {
        document.getElementById("mul").style.backgroundColor = "lightgray"
    }
    else if (operator === "div") {
        document.getElementById("div").style.backgroundColor = "lightgray"
    }
}

function whiteBackground() {
    document.getElementById("add").style.backgroundColor = "white"
    document.getElementById("sub").style.backgroundColor = "white"
    document.getElementById("mul").style.backgroundColor = "white"
    document.getElementById("div").style.backgroundColor = "white"
}

window.onload = init;
