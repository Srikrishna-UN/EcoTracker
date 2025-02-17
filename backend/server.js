const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); // To parse JSON request body

const dataFilePath = './data.json';

// GET: Fetch actions
app.get('/api/actions', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading data' });
        }
        res.json(JSON.parse(data || '[]'));
    });
});

// POST: Add new action
app.post('/api/actions', (req, res) => {
    const newAction = req.body;

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        let actions = [];
        if (!err && data) {
            actions = JSON.parse(data);
        }

        // Determine the next index
        const nextIndex = actions.length > 0 ? actions[actions.length - 1].id + 1 : 1;

        // Add the new action with an auto-incremented ID
        const actionWithId = { id: nextIndex, ...newAction };
        actions.push(actionWithId);

        // Write back to JSON file
        fs.writeFile(dataFilePath, JSON.stringify(actions, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error writing data' });
            }
            res.status(201).json(actionWithId);
        });
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
