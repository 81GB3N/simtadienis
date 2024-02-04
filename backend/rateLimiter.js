const express = require("express");
const proxy = require("express-http-proxy");
const rateLimit = require("express-rate-limit");
const app = express();

// In-memory storage for client rates
const clientRates = new Map();

// Rate-limiting middleware configuration
const limiter = (req, res, next) => {
  const clientIp = req.ip; // Assuming you're behind a proxy
  const rateLimitKey = `client:${clientIp}`;

  // Check if the client has exceeded the rate limit
  if (!clientRates.has(rateLimitKey)) {
    clientRates.set(rateLimitKey, { count: 0, timestamp: Date.now() });
  }

  const clientRate = clientRates.get(rateLimitKey);
  const elapsedTime = Date.now() - clientRate.timestamp;

  if (elapsedTime < 60000 && clientRate.count >= 2) {
    // Rate limit exceeded
    return res.redirect("/rate-limit-exceeded");
  }

  // Update the count and timestamp for the client
  clientRate.count += 1;
  clientRate.timestamp = Date.now();

  // Continue with the request
  next();
};

module.exports = {
    limiter,
}


////RATE LIMITER

//erro handling for 503 error from rate limit
// const handle503Error = (err, req, res, next) => {
//   if (err && err.status === 503) {
//       // Redirect to the specified route
//       return res.redirect("/");
//   }
//   next(err);
// };

// app.use(
  //   "/api/getallusers",
  //   proxy("http://lic100.lt", {
    //       proxyErrorHandler: handle503Error,
    //   })
    // );
    
    // Rate-limiting middleware configuration
    // const limiter = rateLimit({
    //   windowMs: 60 * 1000, // 1 minute
    //   max: 2, // Maximum number of requests per windowMs
    //   message: "Rate limit exceeded. Try again later.",
    //   handler: (req, res) => {
    //     // Redirect to another route when rate limit is exceeded
    //     res.redirect("localhost:3000");
    //   },
    // });
    
    // Apply the rate limiter to the specific route
    // app.use("/api", limiter);