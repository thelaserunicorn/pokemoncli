import fs from 'fs/promises'
import path from 'path'

const createFolder = async(folderName)=>{
    const folderPath = path.join(process.cwd(), folderName)
    try {
        await fs.access(folderPath)
    } catch {
        fs.mkdir(folderName)
    }
}
createFolder("Test")