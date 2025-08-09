const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();


app.use(express.json());
app.use(cookieParser()) //to send cookies as the response of a request
app.use(cors({credentials:true}))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});