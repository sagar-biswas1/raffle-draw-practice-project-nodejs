require("dotenv").config();
const express = require('express');
const app = express();
const {errorHandler,notfoundHandler}=require('./error')

app.use(require('./middlewire'));



app.use(require('./routes'))

app.use(notfoundHandler)
app.use(errorHandler)


// this two are custom middle wire for handling error
// app.use((req,res,next)=>{
//     const error = new Error("Resource not found");
//     error.status=404;
//     next(error);
// })


// app.use((error, req, res, next)=>{
//     // for custom error
//     if(error.status){
//       return res.status(error.status).json({
//            message:error.message
//        })
//     }
//     // for server generated error
//     res.status(500).json({
//       message: 'something went wrong',
//     });
// })
//---------------------------------------------

module.exports = app;
