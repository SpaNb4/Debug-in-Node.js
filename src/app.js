var express = require('express');
var app = express();
var db = require('./db/db');
var user = require('./controllers/usercontroller');
var game = require('./controllers/gamecontroller');

const { PORT } = require('./common/config');

(async () => {
    await db.sync();
    console.log('All models were synchronized successfully.');
})();

app.use(express.json());
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'));
app.use('/api/game', game);
app.listen(PORT, function () {
    console.log(`App is listening on ${PORT}`);
});
