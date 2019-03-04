/*
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

const staticDirPath = path.resolve(path.join(__dirname, 'build'));

// console.log(staticDirPath);

// serve static assets normally
app.use(express.static(staticDirPath));

// app.use('/', express.static(staticDirPath));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('/', function(req, res) {
  // res.sendFile(path.resolve(path.join(__dirname, 'build', 'index.html')));
  res.send('hello world!');
});

app.listen(port);
console.log('server started on port ' + port);

*/

const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

const staticDirPath = path.resolve(__dirname, 'build');

// console.log(staticDirPath);

// serve static assets normally
// app.use(express.static('build'));

app.use('/', express.static(staticDirPath));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log('server started on port ' + port);
