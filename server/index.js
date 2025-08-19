const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(express.json());

//route
app.get('/api/health', (req, res) => {
    res.json({ ok: true });
});

//asset routes
const assetRoutes = require('./routes/assets');
app.use('/api/assets', assetRoutes);

//database connection and sync
const { sequelize } = require('./db');

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully')
    
//only sync in development when DB sync=true
if (process.env.DB_SYNC ==='true') {
    await sequelize.sync() ;
    console.log('Database synced');
}

app.listen(PORT, () => {
    console.log('Server running on https://localhost:${PORT}');
});
} catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
};
}
startServer ();
