exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("claims")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("claims").insert([
        {
          policy_id: 1,
          claim_number: "5514-A229",
          cause_of_loss: "Hail",
          date_of_loss: "2014-12-12",
          date_filed: "2015-01-08",
          date_closed: "2015-04-19",
          payment: 1500
        },
        {
          policy_id: 1,
          claim_number: "6489-A445",
          cause_of_loss: "Flood",
          date_of_loss: "2015-01-20",
          date_filed: "2015-01-25",
          date_closed: "2015-11-12",
          payment: 0
        },
        {
          policy_id: 1,
          claim_number: "7787-A222",
          cause_of_loss: "Wind",
          date_of_loss: "2017-10-13",
          date_filed: "2017-10-15",
          date_closed: "2017-10-17",
          payment: 0
        },
        {
          policy_id: 1,
          claim_number: "8845-C774",
          cause_of_loss: "Wind",
          date_of_loss: "2018-11-20",
          date_filed: "2018-11-21",
          date_closed: undefined,
          payment: 0
        }
      ]);
    });
};
