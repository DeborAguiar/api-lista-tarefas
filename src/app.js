require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectionString = process.env.MONGO_URI;
mongoose.connect(connectionString);

const Task = mongoose.model('Task', {
    name: String,
    description: String,
    done: Boolean
});


app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send({
        status: 200,
        tasks
    });
});


app.post('/task', async (req, res, next) => {
    if (!req.body || !req.body.name) {
        console.error("POST without body not permitted!");
        return res.status(400).send("POST without body not permitted!");
    }
    try {
        let newTask = new Task({
            name: req.body.name,
            description: req.body.description,
            done: false
        });
        await newTask.save();
        res.status(201).send(newTask); 
    } catch (err) {
        next(err); 
    }
});


app.put('/task/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid task ID');
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTask) {
            return res.status(404).send('Task not found');
        }
        res.status(200).send(updatedTask);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.delete('/task/:id', async (req, res) => {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid task ID');
    }

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).send('Task not found');
        }
        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`App running on port ${port}`);
    });
}

module.exports = app;
