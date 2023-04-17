export function responseLogger(req, res, next) {
  const originalSend = res.send;

  res.send = function (body) {
    console.log(`Response: ${res.statusCode} - ${req.method} ${req.path}`);
    originalSend.call(this, body);
  };

  next();
}