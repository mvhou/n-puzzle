import fs from "fs";

export const getLines = (filePath) => {
    if (!fs.existsSync(filePath))
        return null
    return fs.readFileSync(filePath).toString().split('\n')
}