// this two are custom middle wire for handling error
const notfoundHandler=(_req,_res,next)=>{
    const error = new Error("Resource not found");
    error.status=404;
    next(error);
}


const errorHandler=(error, req, res, next)=>{
    // for custom error
    if(error.status){
      return res.status(error.status).json({
           message:error.message
       })
    }
    // for server generated error
    res.status(500).json({
      message: 'something went wrong',
    });
}
//---------------------------------------------

module.exports ={notfoundHandler, errorHandler}