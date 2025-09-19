const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');

dotenv.config();
connectDb();
const port = process.env.PORT || 3000;

const app = express();


app.use(express.json());
app.use(cookieParser()) //to send cookies as the response of a request

const allowedOrigins = ['https://mern-auth-blog.vercel.app']
app.use(cors({origin: allowedOrigins, credentials:true}))

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/blogs', blogRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});