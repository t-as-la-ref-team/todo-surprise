const express = require('express');
//require('dotenv').config();
const app = express();
const port = 3000;
const cors = require('cors');
const membersRoutes = require('./routes/membres');
const db = require('./db'); // Assurez-vous que le chemin est correct

app.use(express.json());
app.use(cors());
app.use('/api/membres', membersRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));