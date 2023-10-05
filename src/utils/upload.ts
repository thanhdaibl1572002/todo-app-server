import { Request } from 'express'
import { hashSync } from 'bcrypt'
import fs from 'fs'
import multer from 'multer'

export const upload: multer.Multer = multer({
    storage: multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, callback) => {
            const subfolderName: string = generateSubfolderName('prefix', 'suffix')
            if (generateSubfolder(subfolderName)) callback(null, `src/uploads/${subfolderName}`)
        },
        filename: (req: Request, file: Express.Multer.File, callback) => {
            const fileName: string = generateFileName(file)
            callback(null, fileName)
        }
    })
})

export const generateFileName = (file: Express.Multer.File): string => {
    const date: string = new Date().toISOString().slice(0, 10)
    const hash: string = hashSync(file.originalname, 10).slice(7, 15)
    const extension: string | undefined = file.originalname.split('.').pop()
    return `${date}__${hash}.${extension}`
}

export const generateSubfolderName = (prefix: string, suffix: string): string => {
    const subfolderName: string = `${prefix}__${suffix}`
    return subfolderName
}

export const generateSubfolder = (subfolderName: string): boolean => {
    const subfolderPath = `src/uploads/${subfolderName}`
    try {
        !fs.existsSync(subfolderPath) && fs.mkdirSync(subfolderPath)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}