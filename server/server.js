const PORT = process.env.PORT ?? 8000;
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db.js'); // db connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');

app.use(cors());
app.use(express.json()); // req.body

app.get('/', (req, res) => {
    res.send('Hello Sofia!');
    console.log(pool);
});

// GET all todos
app.get('/todos/:email', async (req, res) => {
    const {email} = req.params;
    try{
        const allTodos = await pool.query('SELECT * FROM todos WHERE email = $1', [email]);
        res.json(allTodos.rows);

    }catch (err){
        console.log(err);
    }
});

// CREATE a todo
app.post('/todos', async (req, res) => {
    try{
        const {email, title, progress, date, description, project} = req.body;
        console.log(req.body);
        const completed = false;
        const id = uuidv4();
        const newTodo = await pool.query(
            'INSERT INTO todos (id, email, title, progress, completed, added_date, description, project) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [id, email, title, progress, completed, date, description, project]
        );
        res.json(newTodo.rows[0]);
    }catch (err){
        console.log(err);
    }
});

// UPDATE a todo
app.patch('/todos/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const {title, progress, date, description, project} = req.body;
        console.log(req.body);
        const updateTodo = await pool.query(
            'UPDATE todos SET title = $1, progress = $2, added_date= $3, description=$4, project=$5 WHERE id = $6',
            [title, progress, date, description, project, id]
        );
        res.json('Todo was updated!');
    }catch (err){
        console.log(err);
    }
});

// DELETE a todo
app.delete('/todos/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        res.json('Todo was deleted!');
    }catch (err){
        console.log(err);
    }
});

// SIGN UP
app.post('/signup', async (req, res) => {
    const {email, password, fname} = req.body;
    try{
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const signUp = await pool.query(
            'INSERT INTO users (email, hashed_password, fname) VALUES ($1, $2, $3)',
            [email, hashedPassword, fname]
        );

        const token = jwt.sign({email}, 'secret', {expiresIn: '1h'});
        res.status(200).json({token, email, fname});
    }catch (err){
        console.log(err);
        if (err.code === '23505') {
            res.status(400).json({message: `Email ${email} already exists!`});
        }
    }
});

// Log in
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (!user.rows.length) return res.status(400).json({message: `User with email ${email} does not exist!`});
        console.log(req.body.email);
        
        const sucess = await bcrypt.compare(password, user.rows[0].hashed_password);
        const token = jwt.sign({email}, 'secret', {expiresIn: '1h'});
        res.status(200).json({token, email, fname: user.rows[0].fname});
        
        if (sucess) {
             
        } else {
            res.status(400).json({message: `Log in has failed! Wrong password or email!`});
        }
    }catch (err){
        console.log(err);
    }
});  

//Get user name
app.get('/users/:email', async (req, res) => {
    const {email} = req.params;
    try{
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        res.status(200).json(user.rows[0].fname);
    }catch (err){
        console.log(err);
    }
});

app.listen(PORT, () => {
  console.log(`This server listening on port ${PORT}`);
});
