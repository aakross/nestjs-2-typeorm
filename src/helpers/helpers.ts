import { extname } from "path"
export const nombreArchivo = (file: string) => {
    return `${Date.now()}${extname(file)}`;
} 