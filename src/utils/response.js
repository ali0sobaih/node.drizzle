export const success = (res, message, data = null, statusCode = 200)=>{
    res.status(statusCode).json({
        "status" : statusCode,
        "message" : message,
        "data" : data
    })
}


export const error = (res, message, data = null, statusCode = 500)=>{
    res.status(statusCode).json({
        "status" : statusCode,
        "message" : message,
        "data" : data
    })
}