const express  = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const mysqlConfig = require('./config.json'); 
const db = mysql.createConnection(mysqlConfig.mysql);
db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post("/todos", (req,res) => {
    const todoText = req.body.todoText;
    const dbQuery = "INSERT INTO todos (todoText) VALUES (?)";
    db.query(dbQuery, [todoText], (error, response) => {
        if (error) {
            res.send(error);
        } else {
            res.send(response);
        }
    });
});

app.get("/todos", (req,res) => {
    const dbQuery = "SELECT * FROM todos";
    db.query(dbQuery, (error, response) => {
        if (error) {
            res.send(error);
        } else {
            res.send(response);
        }
    });
});

app.post('/todosDelete', (req,res) => {
    const {id} = req.body.params;
    console.log(id);
    const query = "DELETE FROM todos WHERE id = ?";
    db.query(query, [id], (error, response) => {
        if (error) {
            res.send(error);
        } else {
            res.send('deleted');
        }
    });
});

app.post('/todoDone', (req,res) => {
    const {id} = req.body.params;
    console.log(id);
    const query = 'UPDATE todos SET todoDone = 1 WHERE id = ?';
    db.query(query, [id], (error, response) => {
        if(error) { 
            console.log(error);
        } else {
            console.log('Altered id => ', id);
        }
    })
})

app.listen(3001, (req,res) => {
    console.log("APP STARTED ON PORT 3001")
})

