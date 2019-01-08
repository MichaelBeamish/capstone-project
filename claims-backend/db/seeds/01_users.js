exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          email: "michael.beamish@safefarm.com",
          password: "123456",
          first_name: "Michael",
          last_name: "Beamish",
          alias: "RQLI",
          roll: "Claims Handler",
          phone: "(480) 369-0135"
        }
      ]);
    });
};
