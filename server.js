//const { SESClient } = require("@aws-sdk/client-ses");

import express from "express"
import cors from "cors"
import router from "./routes/router.js"

const app = express();
import path from "path"

const email_1 = ["nandika.chirala@vanderbilt.edu"]
const email_2 = ["nandikachirala@gmail.com"]

app.use(express.json());
app.use(cors);
app.use(router);
app.use("/", express.static("public"));

app.get('/', function(request, response){
    response.status(200).send("hello world");
    //response.sendFile(path.join(__dirname, 'frontend-UI.html'));
});
app.get('*', function(request, response){
    response.send('nothing here');
});

app.listen(3300, function(){
    console.log("Server is up at port 3300");
});

// import express from "express"
// import cors from "cors"

// const app = express();
// app.use(express.json())
// app.use(cors)
// app.use("/", express.static("public"))

// const port = 3000

// app.get("/", (request, response)=>{
//     response.stauts(200).send("hello world");
// }) 

// app.listen(port, () => {
//     console.log("port running on localhost")
// })