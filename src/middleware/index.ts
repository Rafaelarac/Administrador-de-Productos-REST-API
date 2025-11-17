import { Request, Response, NextFunction } from "express";
import {validationResult} from 'express-validator'


export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    //Recuperar mensajes de error y ver la validacion con validationResult nos da un true
    let errors = validationResult(req)
    //Si hay errores.. o esta vacio entra como true, al estar negado en false, entra en true
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    next()
}


