#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
// GAME VARIABLE
let enemies: string[] = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let MaxEnemyHealth = 100;
let EnemyAttackDamage = 25;

// PLAYER VARIABLE
let Health = 100;
let AttackDamage = 50;
let NumberofHealthPotion = 3;
let HealthPotionHealAmount = 30;
let HealthPotionDropChance = 50; // 50% chance to drop a health potion

let running = true;

console.log(chalk.magentaBright
    
("Welcome to the Dungeon!!"));

async function main() { // Wrapping the game logic inside an async function

    GAME: // Label for the main loop
    while (running) {
        console.log(chalk.yellow("---------------------------------------"));

        let EnemyHealth = Math.floor(Math.random() * (MaxEnemyHealth + 1));
        let Enemy = enemies[Math.floor(Math.random() * enemies.length)];

        console.log(chalk.redBright(`\t ${Enemy} has appeared. \n`));

        while (EnemyHealth > 0) {
            console.log(chalk.overline(`\tYour HP: ${Health}`));
            console.log(chalk.overline(`\t${Enemy}'s Health: ${EnemyHealth}`));

            let action = await inquirer.prompt([
                {
                    name: "perform",
                    type: "list",
                    message: "\nWhat would you like to do?",
                    choices: [
                        { name: "Attack", value: "attack" },
                        { name: "Drink Health Potion", value: "drink_health_potion" },
                        { name: "Run", value: "run" }
                    ],
                }
            ]);

            if (action.perform === "attack") {
                let DamageDealt: number = Math.floor(Math.random() * AttackDamage);
                let DamageTaken: number = Math.floor(Math.random() * EnemyAttackDamage);

                EnemyHealth -= DamageDealt;
                Health -= DamageTaken;

                console.log(chalk.overline(`\n\t> You strike the ${Enemy} for ${DamageDealt} damage.`));
                console.log(chalk.overline(`\t> You receive ${DamageTaken} in retaliation.\n`));

                if (Health < 1) {
                    console.log(chalk.overline(`\tYou have taken too much damage. You are too weak to go on!!`));
                    break;
                }

            } else if (action.perform === "drink_health_potion") {
                if (NumberofHealthPotion > 0) {
                    Health += HealthPotionHealAmount;
                    NumberofHealthPotion--;

                    console.log(chalk.overline(`\tYou drink a health potion, healing yourself for ${HealthPotionHealAmount}.`));
                    console.log(chalk.overline(`\tYou now have ${Health} HP.`));
                    console.log(chalk.overline(`\tYou have ${NumberofHealthPotion} health potion(s) left.`));

                } else {
                    console.log(chalk.overline(`\tYou have no health potions left. Defeat enemies to get one!`));
                }

            } else if (action.perform === "run") {
                console.log(chalk.overline(`\tYou run away from the ${Enemy}`));
                continue GAME; // Ignore everything and go to the main loop.
            }
        }

        if (NumberofHealthPotion < 1) {
            console.log(chalk.magenta(`You limp out of the Dungeon. Weak from the battle!!`));
            break;
        } else {
            console.log(chalk.yellow(`-------------------------------------------------------`));
            console.log(chalk.magenta(`\t${Enemy} was defeated!`));
            console.log(chalk.yellowBright(`\t You have ${Health} HP left.\n`));

            if (Math.floor(Math.random() * 100) < HealthPotionDropChance) {
                NumberofHealthPotion++;
                console.log(chalk.magenta(`The ${Enemy} left a health potion!`));
                console.log(chalk.yellowBright(`You now have ${NumberofHealthPotion} health potion(s).`));
            }

            console.log(chalk.yellow(`-------------------------------------------------------`));
            let response = await inquirer.prompt([
                {
                    name: "answer",
                    type: "list",
                    choices: [
                        { name: 'Continue Dungeon', value: 'Continue Dungeon' },
                        { name: 'Exit Dungeon', value: 'Exit Dungeon' }
                    ],
                    message: "\nWhat would you like to do now? "
                }
            ]);

            if (response.answer === 'Continue Dungeon') {
                console.log(chalk.green(`\tYou continue on your adventure.`));
            } else if (response.answer === 'Exit Dungeon') {
                console.log(chalk.green`\t\nYou Exited the Dungeon, successful from your adventure!`);
                break;
            }
        }
    }

    console.log(chalk.redBright(`\n-------Thanks for Playing!!-------`));
}

main(); // Calling the async function to start the game
