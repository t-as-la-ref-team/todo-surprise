const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.BACK_PORT || 3000;
const frontport = process.env.FRONT_PORT || 8000;
const cors = require('cors');

const membersRoutes = require('./routes/membres');
const tachesRoutes = require('./routes/taches');

app.use(express.json());
app.use('/api/membres', membersRoutes);
app.use('/api/taches', tachesRoutes);

app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));