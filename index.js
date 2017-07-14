const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const app = express();
const models = require('./models');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  models.Todo.findAll().then(function(todos){
    todos.forEach(function(todo){
      console.log(todo);
    });
    res.render('index', {todos: todos});
  });
});


app.post('/create', function(req, res){
  models.Todo.create({
    title: req.body.todo
  }).then(function(newTodo){
    res.redirect('/');
  });
});

app.post('/done', function(req, res){
  console.log(req.body);
  models.Todo.destroy({
  //   completed: new Date()
  // },{
    where: {
      id: Number(req.body.done)
    }
  }).then(function(done){
    res.redirect('/');
  });
});

app.listen(3000, function(req,res){
  console.log('Oi!');
});
