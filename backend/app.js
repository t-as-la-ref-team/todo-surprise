const express = require('express');
const app = express();
const port = 3000;
const membersRoutes = require('./routes/membres');

app.use(express.json());
app.use('/api/membres', membersRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));