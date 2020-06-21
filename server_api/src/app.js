const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');


console.log("Starting server...");

const app = express();

/* requests logger */
app.use(morgan('tiny'));

/* config middlewares */
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

/* security headers */
app.use(function applyHeaders(req, res, next) {
    res.set('X-Frame-Options', 'DENY');
    res.set('Content-Security-Policy', "frame-ancestors 'none';");
    next(); 
});

/* static files */
const staticPath = path.join(__dirname, '../static');
console.log("Static files from folder " + staticPath);
app.use(express.static(staticPath));

/* api router */
const routes = require("./api/api.routes");
app.use('/api', routes);

/* listen on port */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));