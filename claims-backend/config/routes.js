const users = require("../controllers/users.js");
const policies = require("../controllers/policies.js");
const policy_events = require("../controllers/policy_events.js");
const claims = require("../controllers/claims.js");
const claim_events = require("../controllers/claim_events.js");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";

module.exports = function(app) {
  // app.post("/users", users.create);
  // app.post("/sessions", users.login);

  // app.use(verifyToken);
  // app.get("/user", users.verify);

  app.get("/search/:policy", policies.searchAll);

  app.get("/policies", policies.index);
  app.get("/policies/:id", policies.getOne);
  app.get("/policiesDisplay/:id", policies.getAllInfo);
  app.post("/policies", policies.create);
  app.patch("/policies/:id", policies.update);
  app.delete("/policies/:id", policies.delete);

  app.get("/policy_events", policy_events.index);
  app.get("/policy_events/:id", policy_events.getOne);
  app.post("/policy_events", policy_events.create);
  app.patch("/policy_events/:id", policy_events.update);
  app.delete("/policy_events/:id", policy_events.delete);

  app.get("/claims", claims.index);
  app.get("/claims/:id", claims.getOne);
  app.get("/claimsDisplay/:id", claims.getAllInfo);
  app.post("/claims", claims.create);
  app.patch("/claims/:id", claims.update);
  app.delete("/claims/:id", claims.delete);

  app.get("/claim_events", claim_events.index);
  app.get("/claim_events/:id", claim_events.getOne);
  app.post("/claim_events", claim_events.create);
  app.patch("/claim_events/:id", claim_events.update);
  app.delete("/claim_events/:id", claim_events.delete);
};

// function verifyToken(req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers["token"];
//   // decode token
//   if (token) {
//     // verifies secret and checks exp
//     jwt.verify(token, secret, function(err, decoded) {
//       if (err) {
//         return res.status(401).send({
//           message:
//             "You are not authorized to view that resource, Please log in to continue."
//         });
//       } else {
//         // if everything is good, save to request for use in other routes
//         delete decoded.password;
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     // if there is no token
//     // return an error
//     return res.status(401).send({
//       message:
//         "You are not authorized to view that resource, Please log in to continue."
//     });
//   }
// }
