const express = require('express');
const { connectDB ,sequelize} = require('./config/db');
const authRoutes = require('./routes/Auth');
const profileRoutes = require('./routes/Profile');

const swaggerSetup = require('./swagger');
const User = require('./models/User');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(cors());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // File naming format
  }
});
const upload = multer({ storage: storage });
swaggerSetup(app);
// Connect to the database
connectDB();
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

// Routes



app.use('/api/auth', authRoutes);

app.use('/api/profile', profileRoutes);
app.get('/', async (req, res) => {
 res.send('Hello World');
}
);



// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
