
const mongoose = require("mongoose")
const db = require("./models");
const logger = require("morgan");
const express = require("express");
const PORT = process.env.PORT || 3000;

const path = require("path");
const app = express()
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true })

//html routes
app.get("/",(req,res)=>{
   res.sendfile(path.join(__dirname, "/public/index.html"))
})
app.get("/exercise",(req,res)=>{
   res.sendfile(path.join(__dirname, "/public/exercise.html"))
})
app.get("/stats",(req,res)=>{
   res.sendfile(path.join(__dirname, "/public/stats.html"))
})

//api routes
app.get("/api/workouts", (req,res)=>{
    db.Workout.find({})
    .then(dbWorkout=>res.json(dbWorkout))
    .catch(err=>res.json(err))
})

app.get("/api/workouts/range",(req,res)=>{
    db.Workout.find({})
    .then(dbWorkout=>res.json(dbWorkout))
    .catch(err=>res.json(err))
})

app.post("/api/workouts",(req,res)=>{
    db.Workout.create(req.body)
    .then(dbWorkout =>res.json(dbWorkout))
    .catch(err =>res.json(err))
})

app.put("/api/workouts/:id",(req,res)=>{
    db.Workout.findByIdAndUpdate({}, {$push:{exercises:req.body}},{ new: true })
    .then(workouts=>res.json(workouts))
})
//api routes








app.listen(PORT, () => console.log(`Running on port: ${PORT}`))