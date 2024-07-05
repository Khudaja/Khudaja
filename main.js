#! /usr/bin/env node
import inquirer from "inquirer";
let answer = await inquirer.prompt([
    {
        name: "Minute",
        type: "number",
        message: "Enter the amount of Minutes:",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter a valid number.";
            }
            else if (input < 0) {
                return "Minutes must b a positive number.";
            }
            else {
                return true;
            }
        }
    },
    {
        name: "Second",
        type: "number",
        message: "Enter the amount of Seconds:",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter a valid number.";
            }
            else if (input < 0 || input >= 60) {
                return "Seconds must be between 0 to 59.";
            }
            else {
                return true;
            }
        }
    },
]);
//  Calculate the total time in seconds
let TotalSeconds = answer.Minute * 60 + answer.Second;
function startTimer(value) {
    const initialTime = new Date().getTime() + value * 1000; // Convert seconds to milliseconds
    const timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDifference = Math.max((initialTime - currentTime) / 1000, 0); // Remaining time in seconds
        if (timeDifference <= 0) {
            clearInterval(timer); // Stop a timer that was previously started with setInterval()
            console.log(`Timer has been Ended.`);
            process.exit();
        }
        const minutes = Math.floor(timeDifference / 60); // Calculate remaining minutes
        const seconds = Math.floor(timeDifference % 60); // Calculate remaining seconds
        console.clear(); // Clears the screen 
        console.log(`Time Remaining: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);
}
startTimer(TotalSeconds);
