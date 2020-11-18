const app = require('./app');
const logger = require('./config/logger')('server', { info: true });

const port = process.env.APP_PORT || 3000;

app.listen(port, () => logger.info(`Server is running on port ${port}`));
