#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";

const response = await inquirer.prompt([
     {
          name: "userInput",
          type: "number",
          message: "Please Enter the Amount of seconds",
          validate: (input) => {
               if (isNaN(input)) {
                    return "Please Enter a valid number";
               } else if (input < 0) {
                    return "Number must be greater than or equal to 0";
               } else {
                    return true;
               }
          },
     },
]);

let input = response.userInput;

function startTime(val: number) {
     console.log(chalk.yellow.bold.italic("\n\tStarting Timer ...\n\n"));
     
     let initTime = new Date().setSeconds(new Date().getSeconds() + val);
     const intervalTime = new Date(initTime);
     setInterval(() => {
          const currTime = new Date();
          let timeDiff = differenceInSeconds(intervalTime, currTime);

          if (timeDiff <= 0) {
               console.log(chalk.red.bold.bgYellow("\t\tTimer has expired.."));
               process.exit();
          }
          const hours = Math.floor(timeDiff / 3600);
          const min = Math.floor((timeDiff % 3600) / 60);
          const sec = Math.floor(timeDiff % 60);

          const timerOutput = chalk.greenBright.bold(
               `\t\t${hours.toString().padStart(2, "0")} : ${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`,
          );

          console.log(timerOutput);
          console.log(); // Empty line for gap
     }, 1000);
}

startTime(input);

