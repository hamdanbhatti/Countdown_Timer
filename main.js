import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
const response = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: "Please Enter the Amount of second",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please Enter a valid number";
            }
            else if (input > 60) {
                return "Number must be less than or equal to 60";
            }
            else {
                return true;
            }
        },
    },
]);
let input = response.userInput;
function startTime(val) {
    let initTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(initTime);
    setInterval(() => {
        const currTime = new Date();
        let timeDiff = differenceInSeconds(intervalTime, currTime);
        if (timeDiff <= 0) {
            console.log(chalk.red("Timer has expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
startTime(input);
