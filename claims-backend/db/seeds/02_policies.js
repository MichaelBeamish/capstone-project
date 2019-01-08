exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("policies")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("policies").insert([
        {
          policy_number: "D98-458-8945",
          policy_type: "Homeowner",
          insured_location: "1234 Nice Place Dr. Tempe, Az 85281",
          named_insured: "Bobby Bentsworth",
          mailing_address: "1234 Nice Place Dr. Tempe, Az 85281",
          phone_number: "(480) 867-5309",
          deductible: 1000,
          policy_limit: 400000
        },
        {
          policy_number: "F42-124-8245",
          policy_type: "Homeowner",
          insured_location: "9984 N Price Rd. Tempe, Az 85281",
          named_insured: "Jason Brown",
          mailing_address: "9984 N Price Rd. Tempe, Az 85281",
          phone_number: "(602) 228-8845",
          deductible: 500,
          policy_limit: 372000
        }
      ]);
    });
};
