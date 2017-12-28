var express = require('express')
var app = express()
var mongojs = require('mongojs')
var db = mongojs('contactlist', ['contactlist'])
var bodyParser = require('body-parser')

// app.get('/', function (req, res) {
//   res.send('Hello World from server.js')
// })

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

app.get('/contactlist', function(req, res) {
  console.log('get request received')

  db.contactlist.find(function (err, docs) {
    console.log(docs)
    res.json(docs)
  })

  //   person1 = {
  //     name: 'Tim',
  //     email: 'tim@gmail.com',
  //     number: '(111) 111-1111'
  //   },
  //   person2 = {
  //     name: 'Char',
  //     email: 'char@gmail.com',
  //     number: '(222) 222-2222'
  //   },
  //   person3 = {
  //     name: 'Fel',
  //     email: 'felicia@gmail.com',
  //     number: '(333) 333-3333'
  //   }
  //
  // var contactlist = [person1, person2, person3]
  // res.json(contactlist)

})

app.post('/contactlist', function (req, res) {
  console.log(req.body)
  db.contactlist.insert(req.body, function (err, docs) {
    res.json(docs)
  })
})

app.delete('/contactlist/:id', function(req, res) {
  var id = req.params.id
  console.log(id)
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
    res.json(docs)
  })
})

app.get('/contactlist/:id', function(req, res) {
  var id = req.params.id
  console.log(id)
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, docs) {
    res.json(docs)
  })
})

app.put('/contactlist/:id', function(req, res) {
  var id = req.params.id
  console.log(req.body.name)
  db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function(err, docs) {
      res.json(docs)
  })
})

app.listen(3000)
console.log('Server running on port 3000')
