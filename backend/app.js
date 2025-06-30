const express = require('express');
//require('dotenv').config();
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
const membersRoutes = require('./routes/membres');
const tachesRoutes = require('./routes/taches');
const db = require('./db');

app.use(express.json());
app.use('/api/membres', membersRoutes);
app.use('/api/taches', tachesRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));