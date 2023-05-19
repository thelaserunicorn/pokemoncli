import fetch from "node-fetch"
import inquirer from "inquirer"
import  {parseOptions} from "./saving.js"

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

const promptUser = async () => {
    while (true) {
      const pokemonName = await promptForPokemon();
      // fetch the pokemon json
      const pokemonJSON = await fetchPokemon(pokemonName.pokemon_name);
      const pokemonOptions = await promptForDownloadInfo();
      // use what is in these options to fetch the pictures/sprites
      await parseOptions(pokemonJSON, pokemonOptions);
      // save them to the local disk
      const keepGoing = await promptToContinue();
      if (keepGoing.continue === "No") break;
    }
  };

export {promptUser}
