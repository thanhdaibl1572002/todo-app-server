import { Response } from 'express'
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_INTERNAL_SERVER_ERROR } from '@/errors/codes'
import { IResponse } from '@/interfaces/response'
import { ServerErrorMessages } from '@/errors/messages'

export const handleErrorResonse = async (error: unknown, res: Response): Promise<Response<IResponse>> => {
    console.log(error)
    if ( error instanceof Error ) 
        return res.status(HTTP_STATUS_BAD_REQUEST).json({
            message: error.name === 'ValidationError'
            ? error.message
            : '',
            error: error } as IResponse)
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
        message: ServerErrorMessages.INTERNAL_SERVER_ERROR_MESSAGE,
        error: error
    } as IResponse)
}