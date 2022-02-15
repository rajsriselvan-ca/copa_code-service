const express = require('express');
app = express();
const cors = require('cors');
app.use(express.json())

require('dotenv').config();
app.use(cors());
app.use('/dashboard', require('./routes/dashboard'))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`app listening in port number -->> ${PORT}`)
})
