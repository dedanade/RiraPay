const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const enforce = require('express-sslify');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const Ordercontroler = require('./controllers/orderController');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRouter');
const orderRoutes = require('./routes/orderRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.escape = require('html-escaper');
app.locals.moment = require('moment');
app.locals.qs = require('qs');
app.locals.unescape = require('html-escaper');

// 1) GLOBAL MIDDLEWARES

app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(helmet({ frameguard: false }));
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 })
);
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(express.json());

app.use(compression());
// Serving static files

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use(cors());

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRoutes);
app.post('/mywebhook', Ordercontroler.paystackwebhook);
app.post('/moniwebhook', Ordercontroler.monifyWebhook);
app.post('/creatembedeorder', Ordercontroler.createEmbedOrder);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
