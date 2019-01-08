const knex = require("../db/knex.js");

module.exports = {
  index: function(req, res) {
    let page = 1;
    if (req.query.page) {
      page = Number(req.query.page);
    }
    console.log(process.env);
    knex("policies")
      .orderBy("id", "asc")
      .offset((page - 1) * 50)
      .limit(50)
      .then(results => {
        res.json(results);
      })
      .catch(err => {
        res.status(400).send({ message: err });
      });
  },

  getOne: function(req, res) {
    knex("policies")
      .where("id", req.params.id)
      .first()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(400).send({ message: err });
      });
  },

  getAllInfo: function(req, res) {
    knex("policies")
      .where("policy_number", req.params.id)
      .first()
      .then(policy => {
        knex("policy_events")
          .where("policy_events.policy_id", policy.id)
          .then(policy_events => {
            knex("claims")
              .where("claims.policy_id", policy.id)
              .then(claims => {
                res.json({
                  policy: policy,
                  policy_events: policy_events,
                  claims: claims
                });
              });
          });
      })
      .catch(err => {
        res.status(400).send({ message: err });
      });
  },

  searchAll: function(req, res) {
    knex("policies")
      .where("policy_number", req.params.policy)
      .first()
      .then(policy => {
        res.json({
          policy: policy
        });
      })
      .catch(err => {
        res.status(400).send({ message: err });
      });
  },

  create: function(req, res) {
    knex("policies")
      .insert(
        {
          policy_number: req.body.policy_number,
          policy_type: req.body.policy_type,
          insured_location: req.body.insured_location,
          named_insured: req.body.named_insured,
          mailing_address: req.body.mailing_address,
          phone_number: req.body.phone_number,
          deductible: req.body.deductible,
          policy_limit: req.body.policy_limit
        },
        "*"
      )
      .then(results => {
        res.json(results[0]);
      })
      .catch(err => {
        res.status(422).send({ message: err });
      });
  },

  update: function(req, res) {
    knex("policies")
      .where("id", req.params.id)
      .update(
        {
          policy_number: req.body.policy_number,
          policy_type: req.body.policy_type,
          insured_location: req.body.insured_location,
          named_insured: req.body.named_insured,
          mailing_address: req.body.mailing_address,
          phone_number: req.body.phone_number,
          deductible: req.body.deductible,
          policy_limit: req.body.policy_limit
        },
        "*"
      )
      .then(results => {
        res.json(results[0]);
      })
      .catch(err => {
        res.status(422).send({ message: err });
      });
  },

  delete: function(req, res) {
    knex("policies")
      .del()
      .where("id", req.params.id)
      .then(() => {
        res.status(200).send({ message: "Deleted policy." });
      })
      .catch(err => {
        res.status(422).send({ message: err });
      });
  }
};
