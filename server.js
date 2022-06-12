const http = require("http");
const app = require("./app/app");
const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("listening to port", port);
});



// const express= require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// const cors= require("cors");

// app.use(express.json());
// app.use(cors());

// //sagar you will read about clean code architecture....
// const customMiddleWire1=(req, res,next)=>{
// console.log("custom middle wire 1")
// next()
// }

// const customMiddleWire2 = (req, res, next) => {
//   console.log("custom middle wire 2");
//   next();
// };

// app.use([customMiddleWire1, customMiddleWire2]);

// app.get("/",(_, res)=>{
//     res.send({
//         message:"hello world"
//     })
// })

// app.listen(port,()=>{
//     console.log("connected to port " , port);
// })
