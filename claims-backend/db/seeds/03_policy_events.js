exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("policy_events")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("policy_events").insert([
        {
          policy_id: 1,
          event_type: "policyPeriod",
          description: "Policy period.",
          startDate: "2014-07-21",
          endDate: "2017-07-21"
        },
        {
          policy_id: 1,
          event_type: "policyUpdate",
          description: "Deductible changed from $500 to $1000.",
          startDate: "2015-02-10"
        },
        {
          policy_id: 1,
          event_type: "policyPeriod",
          description: "Policy period.",
          startDate: "2018-02-15",
          endDate: "2019-02-15"
        },
        {
          policy_id: 2,
          event_type: "policyPeriod",
          description: "Policy period.",
          startDate: "2018-01-02",
          endDate: "2019-01-02"
        }
      ]);
    });
};
