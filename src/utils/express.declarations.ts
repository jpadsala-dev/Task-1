import express, { Response } from 'express'

declare global {
    namespace Express {
        interface Response {
            success<T>(arg: _IResponseParams<T>): this
            failed<T>(arg: _IResponseParams<T>): this
        }
    }
}

const init = () => {
    function success<T>(this: Response, arg: _IResponseParams<T>): Response {
        const { data, statusCode = 200, message = 'Success', version } = arg
        return this.status(statusCode).json({
            data,
            message,
            version,
        })
    }
    (express.response as any).success = success

    function failed<T>(this: Response, arg: _IResponseParams<T>): Response {
        const { data, statusCode = 500, message = 'Failed!', version } = arg
        return this.status(statusCode).json({
            data,
            message,
            version,
        })
    }
    (express.response as any).failed = failed
}

interface _IResponseParams<T> {
    data: T
    statusCode?: number,
    message?: string,
    version?: string
}

export default init
