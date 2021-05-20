const express = require('express');
const db = require('./db/db');
const userRouter = require('./controllers/userController');
const gameRouter = require('./controllers/gameController');
const validationMiddleware = require('./middleware/validateSession');

const { PORT } = require('./common/config');

const app = express();

app.use(express.json());

app.use('/api/auth', userRouter);
app.use(validationMiddleware);
app.use('/api/game', gameRouter);


(async () => {
    await db.sync();
    console.log('All models were synchronized successfully.');
})();

app.listen(PORT, function () {
    console.log(`App is listening on ${PORT}`);
});
