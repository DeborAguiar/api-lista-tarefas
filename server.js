const express  = require("express")
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port   = 3000
mongoose.connect("mongodb+srv://admin:admin@tasks.xxe6qrh.mongodb.net/?retryWrites=true&w=majority&appName=Tasks");

const Task  = mongoose.model('Task', {
    name: String,
    description: String,
    done: Boolean
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find()
    res.send({
        status: 200
    })
})

app.post('/task', async (req, res, next) => {
    try {
        let newTask = new Task(req.body);
        newTask.done = false;  
        await newTask.save();
        res.status(201).send(newTask); // Use 201 Created for successful creation
    } catch (err) {
      next(err); // Pass error to the error handler
    }
});

app.listen(port, ()=>{
    console.log("App running")
})
