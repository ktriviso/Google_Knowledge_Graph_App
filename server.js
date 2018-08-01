const express      = require('express');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const path         = require('path');
const app          = express();
const port         = process.env.PORT || 5000;
const fetch        = require('node-fetch');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.resolve(__dirname, './client/build')))

app.post('/search', function(request, response) {
  let userSearch = request.body.search.toLowerCase().replace(' ','+')
  const key = 'AIzaSyBKmfzxfjwIa_q5ra6bacR0ZvsCUwOuM-c'

  fetch(`https://kgsearch.googleapis.com/v1/entities:search?query=${userSearch}&key=${key}&limit=10&indent=True`)
    .then(data => data.json())
    .then(data => {
      return data.itemListElement.length > 0 ? response.json(data) : response.json('error')
    })
    .catch(err => console.log(err))
})

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.listen(port, () => console.log(`Listening on port ${port}`));
