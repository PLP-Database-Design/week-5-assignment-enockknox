// Declare dependences / variables
const express = require('express');
const app = express();
const mysql = require ('mysql2');
const dotenv = require ('dotenv');
const cors = require('cors'); 

app.use(express.json());
app.use(cors());
dotenv.config();

// connect to the db

const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

// check for connection
db.connect((err) => {
    if(err) return console.log("Error connecting to the Database",err);
        console.log("Connected to mysql successfully as id:", db.threadId);
// your code goes here
// Get method
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// Data is the name of the file inside views folder
app.get('/data', (req, res)=> {
    // Retrieve data from db
    db.query('SELECT * FROM patients', (err, results) => {
        if (err){
            console.error(err);
            res.status(500).send('Error retrieving data');
        } else {
            res.render('data', {results: results});
        }
    });
});


// GET endpoint to retrieve all providers
app.set('view engine', 'ejs');
app.set('providers', __dirname + '/providers');
app.get('/allproviders', (req, res) => {
    const query = 'SELECT first_name,speciality, last_name, FROM providers';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


app.set('view engine', 'ejs');
app.set('allpat', __dirname + '/allpat');
// allpatient is the name of the file inside views folder
app.get('/allpatients', (req, res)=> {
    // Retrieve data from db
    db.query('SELECT patient_id, first_name, FROM patients' , (err, results) => {
        if (err){
            console.error(err);
            res.status(500).send('Error retrieving data');
        } else {
            res.render('data', {results: results});
        }
    });
});

      
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
        //  send msg to browser
        console.log('Sending message to browser...')
        app.get('/', (req,res) => {
            res.send('Welcome to my week five assignment')
        })

    });
})
