const express = require('express');
const app = express()
const port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})