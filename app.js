const express = require('express');
app = express();

require('dotenv').config();

app.get('/', (req, res) => {
    res.send("Heyy Pattuuuu paapa!!")
});

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`app listening in port number -->> ${PORT}`)
})
