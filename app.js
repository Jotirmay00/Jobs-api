const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')
const port = process.env.PORT || 6000

const jobRoute = require('./routes/jobs')
const userRoute = require('./routes/auth')
const authenticateUser = require('./middleware/auth')

//middleware 
app.use(express.json())


//Routes 
app.use('/api/v1/auth',userRoute)
app.use('/api/v1/jobs',authenticateUser,jobRoute)

 
//Database Connection
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port , ()=>{
            console.log(`The server is running on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

