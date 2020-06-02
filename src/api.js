const express = require('express')
const serverless = require('serverless-http')
const app = express()
const mongoose = require('mongoose')
const PostModel = require('./PostModel')
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv/config")

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const router = express.Router()

mongoose.connect(process.env.URL,
    { useNewUrlParser: true , useUnifiedTopology: true}, () =>
    {
        console.log("Connected with database successfull!")
    })

router.get("/", async (request, response)=>
{
     try{
     const data = await PostModel.find()
     console.log(data)
     response.json(data)
     console.log("Get request successful.")
     }
     catch(error)
     {
          console.log(error)
          response.json(error)
     } 
    
})

router.post("/", (request, response) => {
    console.log("The post request is: " + request.body)

    const postaction = new PostModel({
        username: request.body.username,
        password: request.body.password,
        email: request.body.email
    })


    postaction.save().then(result => {
        response.json(result)
        console.log(result)
        console.log("Post request successful.")
    })
        .catch(error => {

            response.json(error)
            console.log(error)
        })


})


app.use('/.netlify/functions/api',router)

module.exports.handler = serverless(app)

