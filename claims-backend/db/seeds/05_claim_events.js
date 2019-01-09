exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("claim_events")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("claim_events").insert([
        {
          claim_id: 1,
          event_type: "payment",
          description: "Tree removal.",
          startDate: "2014-12-30"
        },
        {
          claim_id: 3,
          event_type: "contact",
          description: "Explained no coverage.",
          startDate: "2017-10-16"
        }
      ]);
    });
};
