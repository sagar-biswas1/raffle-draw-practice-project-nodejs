require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use([morgan("dev"), cors(),express.json()]);



app.get('/',(req,res)=>{
    throw new Error('error')
    res.send("hello");
})


app.get("/health", (_, res) => {
  res.status(200).json({
    message: "success",
  });
});




// this two are custom middle wire for handling error
app.use((req,res,next)=>{
    const error = new Error("Resource not found");
    error.status=404;
    next(error);
})


app.use((error, req, res, next)=>{
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
})
//---------------------------------------------

module.exports = app;
