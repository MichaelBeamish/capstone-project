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
          claim_number: "8845-C774",
          cause_of_loss: "Wind",
          date_of_loss: "2018-11-20",
          date_filed: "2018-11-21",
          date_closed: undefined,
          payment: 1500
        }
      ]);
    });
};
