const globalErrHandler = (err,req,res,next)=>{
    // Message
    // Status
    // StatusCode
    // Stack
   const statusCode = err.statusCode = err.statusCode || 500;
    const status =  err.status = err.status || 'error';
    const message = err.message;
    const stack = err.stack;
    res.status(statusCode).json({
        status,
        message:err.message,
        stack,

    })

}

module.exports = globalErrHandler;