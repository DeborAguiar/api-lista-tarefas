const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const http = require('http');
require('dotenv').config();

let server;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    server = http.createServer(app);
    await new Promise(resolve => server.listen(3000, resolve));
});

afterAll(async () => {
    await mongoose.connection.close();
    await new Promise(resolve => server.close(resolve));
});

describe('Tasks API', () => {
    let taskId;


    test('should create a new task', async () => {
        const res = await request(server)
            .post('/task')
            .send({
                name: 'Test Task',
                description: 'This is a test task',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', 'Test Task');
        expect(res.body).toHaveProperty('description', 'This is a test task');
        expect(res.body).toHaveProperty('done', false);
        taskId = res.body._id;
    }, 10000);


    test('should fetch all tasks', async () => {
        const res = await request(server).get('/tasks');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('tasks');
        expect(res.body.tasks.length).toBeGreaterThan(0);
    }, 10000);


    test('should update a task', async () => {
        const res = await request(server)
            .put(`/task/${taskId}`)
            .send({
                done: true
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', taskId);
        expect(res.body).toHaveProperty('done', true);
    }, 10000);


    test('should delete a task', async () => {
        const res = await request(server)
            .delete(`/task/${taskId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Task deleted successfully');
    }, 10000);
});
