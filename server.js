const express = require('express');
const { connectDB ,sequelize} = require('./config/db');
const authRoutes = require('./routes/Auth');

const swaggerSetup = require('./swagger');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
swaggerSetup(app);
// Connect to the database
connectDB();
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

// Routes



app.use('/api/auth', authRoutes);



// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
