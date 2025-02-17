const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = 'data.json';

app.use(cors());
app.use(bodyParser.json());

// Read actions from data.json
app.get('/actions', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading file' });
        }
        res.json(JSON.parse(data));
    });
});

// Add a new action to data.json
app.post('/actions', (req, res) => {
    const newAction = req.body;

    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading file' });

        const actions = JSON.parse(data);
        actions.push(newAction);

        fs.writeFile(DATA_FILE, JSON.stringify(actions, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error writing file' });
            res.json({ message: 'Action added successfully!' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
