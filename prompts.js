import fetch from "node-fetch"
import inquirer from "inquirer"

const promptForPokemon = async() => {
    return await inquirer.prompt({
        type: 'input',
        name: 'pokemon_name',
        message: 'Pokemon Name: '
    })
}

const promptForDownloadInfo = async () => {
    return await inquirer.prompt({
        type: 'checkbox',
        name: 'options',
        message: 'Pokemon info to download',
        choices: [
            new inquirer.Separator("--OPTIONS--"),
            {
                name: "Stats"
            },
            {
                name: "Sprites"
            },
            {
                name: "Artwork"
            }
        ]
    }).then((answers)=>{
        console.log(answers)
    })

}

const promptToContinue = async() => {
    return await inquirer.prompt({
        type: 'list',
        message: "continue?",
        name: "continue",
        choices: ['Yes', "No"]
    })
}

const url = `https://pokeapi.co/api/v2/pokemon/pikachu`
fetch(url).then((response)=>response.json()).then((json)=>console.log(json))