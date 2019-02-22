const express = require('express');
const app = express();
const port = 3000;

const Author = require('./models/author');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index',{ title : 'Home' });
});

app.get('/author',(req,res) => {
    res.render('author');
});

app.get('/author/all',(req,res) => {
    Author.find({},(err,docs) => {
        res.send(docs);
    });
});

app.all('/author/create',(req,res) => {
    let author = new Author({fname:req.query.fname,lname:req.query.lname});
    author.save((err) => {
        if(err)
            res.send(err);
        else
            res.send("successed!");
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));