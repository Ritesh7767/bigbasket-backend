interface ApiErrorInterface {

    status: number,
    message: string,
    data?: string,
    stack?: string
}

class ApiError extends Error implements ApiErrorInterface {

    status: number
    message: string
    data: string | undefined
    stack?: string | undefined

    constructor(status: number, message: string, data: string = "", stack: string = ""){
        super(message)
        this.status = status
        this.message = message
        this.data = data
    
        if (stack) this.stack = stack
        else Error.captureStackTrace(this, this.constructor)
    }
}

export default ApiError