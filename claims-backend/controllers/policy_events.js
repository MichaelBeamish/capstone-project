const knex = require("../db/knex.js");

module.exports = {
  index: function(req, res) {
    let page = 1;
    if (req.query.page) {
      page = Number(req.query.page);
    }
    console.log(process.env);
    knex("policy_events")
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
    knex("policy_events")
      .where("id", req.params.id)
      .first()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(400).send({ message: err });
      });
  },

  create: function(req, res) {
    knex("policy_events")
      .insert(
        {
          policy_id: req.body.policy_id,
          event_type: req.body.event_type,
          description: req.body.description,
          startDate: req.body.startDate,
          endDate: req.body.endDate
        },
        "*"
      )
      .then(results => {
        res.json(results[0]);
      })
      .catch(err => {
        console.log(err);
        res.status(422).send({ message: err });
      });
  },

  update: function(req, res) {
    knex("policy_events")
      .where("id", req.params.id)
      .update(
        {
          policy_id: req.body.policy_id,
          event_type: req.body.event_type,
          description: req.body.description,
          startDate: req.body.startDate,
          endDate: req.body.endDate
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
    knex("policy_events")
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
