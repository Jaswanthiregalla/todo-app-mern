require("dotenv").config()
const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const authRoutes = require("./routes/authRoutes")
const toDoRoutes = require("./routes/ToDoRoutes")

console.log(process.env.DB_URL)

console.log("hi")
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use("/api", authRoutes)
app.use("/api/todo", toDoRoutes)


mongoose.connect(process.env.DB_URL).then((result) => {
    console.log("DB Connected Successfully")
})
.catch(error => console.log(error))



app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})


