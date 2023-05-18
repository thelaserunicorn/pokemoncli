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
                name: "Stats",
            },
            {
                name: "Sprites",
            },
            {
                name: "Artwork",
            }
        ]
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

const fetchPokemon = async(pokemonName)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    const response = await fetch(url)
    const json = await response.json()
    return json
}

const promptUser = async() => {
    while(true){
        const pokemonName = await promptForPokemon()
        console.log(pokemonName.pokemon_name)
        const pokemonJSON = await fetchPokemon(pokemonName.pokemon_name)
        console.log(pokemonJSON.name, pokemonJSON.weight)
        const pokemonOptions = await promptForDownloadInfo()
        console.log(pokemonOptions.options)
        const keepGoing = await promptToContinue()
        if(keepGoing.continue == "No") break
        

    }
}

promptUser()