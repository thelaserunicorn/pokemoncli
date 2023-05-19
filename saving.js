import fs from 'fs/promises'
import path from 'path'
import { fetchPokemon } from './prompts.js'

const createFolder = async(folderName)=>{
    const folderPath = path.join(process.cwd(), folderName)
    try {
        await fs.access(folderPath)
    } catch {
        fs.mkdir(folderName)
    }
}


const pokemonObject = await fetchPokemon("mewtwo")

const savePokemonStats = async(folderName, pokemonStatsObject)=>{
    let statString = ""
    for(const stat of  pokemonStatsObject){
        statString += `${stat.stat.name}: ${stat.base_stat}\n`
    }
    console.log(statString)
    await createFolder(folderName)
    const filePath = path.join(process.cwd(), folderName, "stats.txt")
    await fs.writeFile(filePath, statString)
}

savePokemonStats("mewtwo", pokemonObject.stats)