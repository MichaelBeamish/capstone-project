<template>
  <div>
    <h1>Policy {{id}}</h1>
    <button>EDIT POLICY INFO</button>
    <button>ADD NEW CLAIM</button>
    <h2>
      Status:
      <span v-if="status === 'Expired'" class="red-status">{{status}}</span>
    </h2>
    <h2>
      Status:
      <span v-if="status === 'In Effect'" class="green-status">{{status}}</span>
    </h2>
    <h2>{{named_insured}}</h2>
    <h2>{{insured_location}}</h2>
    <p>Type: {{policy_type}}</p>
    <p>Policy Limit: ${{policy_limit}}</p>
    <p>Deductible: ${{deductible}}</p>
    <timeline
      v-if="items.length > 0"
      ref="timeline"
      :items="items"
      :groups="groups"
      :options="options"
    ></timeline>
    <h2>Claims:</h2>
    <div v-for="(claim, index) in claims_elements" :key="index">
      <router-link :to="'/claim/' + claim" exact>{{claim}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      status: undefined,
      named_insured: "",
      insured_location: "",
      policy_type: "",
      policy_limit: undefined,
      deductible: undefined,
      claims_elements: [],
      groups: [
        {
          id: 0,
          content: "Policy"
        },
        {
          id: 1,
          content: "Policy Events"
        },
        {
          id: 2,
          content: "Claims"
        }
      ],
      items: [],
      options: {}
    };
  },
  created() {
    this.$http
      .get("http://localhost:8000/policiesDisplay/" + this.id)
      .then(function(data) {
        this.named_insured = data.body.policy.named_insured;
        this.insured_location = data.body.policy.insured_location;
        this.policy_type = data.body.policy.policy_type;
        this.policy_limit = data.body.policy.policy_limit;
        this.deductible = data.body.policy.deductible;

        let timelineIndex = 1;

        data.body.policy_events.forEach(event => {
          if (event.event_type === "policyPeriod") {
            this.items.push({
              id: timelineIndex,
              group: 0,
              content: data.body.policy.policy_number + " in effect.",
              start: new Date(event.startDate),
              end: new Date(event.endDate),
              className: "timeline-policy-period"
            });

            //Check to see if policy is in effect...
            if (
              new Date(event.startDate) < new Date() &&
              new Date(event.endDate) > new Date()
            ) {
              this.status = "In Effect";
            }
          } else {
            this.items.push({
              id: timelineIndex,
              group: 1,
              content: event.description,
              start: new Date(event.startDate),
              className: "timeline-policy-event"
            });
          }
          timelineIndex++;
        });

        if (this.status !== "In Effect") {
          this.status = "Expired";
        }

        data.body.claims.forEach(claim => {
          this.items.push({
            id: claim.claim_number,
            group: 2,
            content: "Claim " + claim.claim_number + " filed.",
            start: new Date(claim.date_of_loss),
            className: "timeline-claim"
          });
          this.claims_elements.push(claim.claim_number);
          timelineIndex++;
        });
      });
  }
};
</script>

<style scoped>
.red-status {
  color: red;
}
.green-status {
  color: green;
}
</style>

<style>
.timeline-policy-period {
  color: white;
  background-color: purple;
  border-color: darkmagenta;
}
.timeline-policy-event {
  color: white;
  background-color: blue;
  border-color: darkblue;
}
.timeline-claim {
  color: white;
  background-color: green;
  border-color: darkgreen;
}
</style>
