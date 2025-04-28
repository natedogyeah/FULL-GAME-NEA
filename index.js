//Import all the modules required
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('databaseNEA.db'); // Create a new database
var express = require('express'); 
var socket = require('socket.io');
var app = express();
app.use(express.static('public'));

// Start the server on port 3000 and log a message when it's running
var server = app.listen(3000, function() {
    console.log('server running');
});
var io = socket(server);                     // Attach socket.io to the server

// Listen for new socket connections
io.on('connection', (socket) => {
    console.log(socket.id + ' has connected');

    // Listen for 'insert' event to insert a high score
    socket.on('insert', function(data) {
        insertHighScore(data);
    });

    // Listen for 'request' event to retrieve high scores
    socket.on('request', function(data) {
        getScores(data);
    });

    // Listen for 'cleanDatabase' event to clean the database
    socket.on('cleanDatabase', () => {
        cleanDatabase();
    });

    socket.on('request', function () {
        getTopScores();
    });
});

// Function to retrieve high scores from the database
function getScores() {
    let sql = "SELECT * FROM Highscores ORDER BY score DESC;";

    db.all(sql, function(err, rows) {
        if (err) {
            console.log("ERROR" + err);
        } else {
            console.log(rows);
            io.emit('sendscores', rows);
        }
    });
}

// Function to insert a new high score into the database
function insertHighScore(data) {
    console.log(data);

    let sql = "INSERT INTO Highscores (Name, Score) VALUES('" + data.Name + "','" + data.Score + "');";
    
    db.all(sql, function(err, rows) {
        if (err) {
            console.log("Error inserting high score: " + err.message);
        } else {
            console.log("Successfully inserted: Name = " + data.Name + ", Score = " + data.Score);
        }
    });
}

// Function to clean the database
function cleanDatabase() {
    console.log("Cleaning database...");
    db.serialize(() => {
        db.run(
            `DELETE FROM Highscores
             WHERE Name = "null" OR Name = 'undefined' OR Name = ''
                OR Score = "null" OR Score = 'undefined' OR Score = '';`,
            function (err) {
                if (err) {
                    console.error("Error cleaning database:", err.message);
                } else {
                    console.log(`Rows deleted: ${this.changes}`);
                }
            }
        );
    });
    console.log("Database cleaned.");
}

// Function to retrieve the top 5 high scores from the database
function getTopScores() {
    let sql = "SELECT Name, Score FROM Highscores ORDER BY Score DESC LIMIT 5;";

    db.all(sql, function (err, rows) {
        if (err) {
            console.log("Error retrieving top scores: " + err.message);
        } else {
            console.log("Top scores:", rows);
            io.emit('sendscores', rows); // Emit the top scores to the client
        }
    });
}
