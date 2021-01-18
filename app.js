const path = require('path');
const express = require('express');

let app = express();

// leyfa express að bera static skjöl
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//request handler fyrir heimasíðu
app.get('/', (req, res) => {
  let title = 'Vídeoleigan';
  res.render('videos', {title});
});

// request handler fyrir önnur URL en heimasíðu
app.get('/:slug', (req, res) => {
  const { slug } = req.params;
  res.send(slug);
});

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`)
});