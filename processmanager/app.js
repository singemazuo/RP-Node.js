const express = require('express');
const app = express();
const port = 3000;

app.post('/exception',(req, res) => {
    process.nextTick(function () {
        throw new Error;
    });
});
app.get('/', (req, res) => res.sendFile(__dirname+'/index.html'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
