// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://mesto-suhachov.nomoredomains.rocks',
  'http://mesto-suhachov.nomoredomains.rocks',
  'http://localhost:3000'
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];


  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  return next();
}
