import fs from 'fs/promises'
import path from 'path'
import fetch from 'node-fetch'
import { fetchPokemon } from './prompts.js'

const saveImageFile = async(filePath, arrayBuffer)=>{
    await fs.writeFile(filePath, Buffer.from(arrayBuffer))
}


const createFolder = async(folderName)=>{
    const folderPath = path.join(process.cwd(), folderName)
    try {
        await fs.access(folderPath)
    } catch {
        fs.mkdir(folderName)
    }
}


const pokemonObject = await fetchPokemon("mew")

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

const savePokemonArtwork = async(folderName, pokemonSpritesObject)=>{
    const url = pokemonSpritesObject.other['official-artwork'].front_default
    console.log(url)
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    await createFolder(folderName)
    const filePath = path.join(process.cwd(), folderName, "artwork.png")
    await saveImageFile(filePath, arrayBuffer)

}

savePokemonArtwork("mew", pokemonObject.sprites)