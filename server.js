const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


// const db = mysql.createConnection({
//     host: 'bwnqx83k3vkvsq0pmasz-mysql.services.clever-cloud.com',
//     user: 'uxpy9ul0wzylmg3c',
//     password: 'AOeVBibm31KFLKFOcvDW',
//     database: 'bwnqx83k3vkvsq0pmasz'
// });


const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12731361',
    password: 'KpCQ7iYNPC',
    database: 'sql12731361'
});


db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

app.get('/todos', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) {
            console.error('Error fetching todos:', err);
            return res.status(500).json({ error: 'Failed to fetch todos' });
        }
        res.json(results);
    });
});



app.post('/todos', (req, res) => {
    const newTodo = req.body;
    db.query('INSERT INTO todos SET ?', newTodo, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newTodo });
    });
});


app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const updatedTodo = req.body;
    db.query('UPDATE todos SET ? WHERE id = ?', [updatedTodo, id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
