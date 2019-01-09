<template>
  <div>
    <div class="policy-info">
      <div class="mybuttons">
        <router-link class="button-b" :to="'/edit_policy'" exact>EDIT POLICY INFO</router-link>
        <router-link class="button-g" :to="'/new_claim'" exact>ADD NEW CLAIM</router-link>
      </div>
      <h1>Policy: {{id}}</h1>
      <h3>{{named_insured}}</h3>
      <h3>{{insured_location}}</h3>
      <h4 v-if="status === 'Expired'">
        Status:
        <span class="red-status">{{status}}</span>
      </h4>
      <h4 v-if="status === 'In Effect'">
        Status:
        <span class="green-status">{{status}}</span>
      </h4>
      <b>
        <p>Type: {{policy_type}}</p>
      </b>
      <b>
        <p>Policy Limit: ${{policy_limit}}</p>
      </b>
      <b>
        <p>Deductible: ${{deductible}}</p>
      </b>
      <timeline
        v-if="items.length > 0"
        ref="timeline"
        :items="items"
        :groups="groups"
        :options="options"
      ></timeline>
      <br>
      <h2>Claims:</h2>
      <div v-for="(claim, index) in claims_elements" :key="index">
        <router-link class="claimButton" :to="'/claim/' + claim" exact>
          Claim:
          <i>{{claim}}</i>
        </router-link>
        <br>
        <br>
      </div>
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
              content: "In Effect",
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
.mybuttons {
  margin-bottom: 1em;
  float: right;
}
.button-b {
  background-color: #3467c2;
  padding: 0.5em;
  margin-left: 1em;
  border-radius: 5px;
  color: white;
}
.button-g {
  background-color: green;
  padding: 0.5em;
  margin-left: 1em;
  border-radius: 5px;
  color: white;
}
.claimButton {
  background-color: darkorange;
  border: 1px;
  border-style: solid;
  border-color: black;
  padding: 0.5em;
  margin: 2em;
  border-radius: 5px;
  color: white;
}
.policy-info {
  margin: 1em;
}
.red-status {
  color: darkred;
}
.green-status {
  color: green;
}
</style>

<style>
.timeline-policy-period {
  color: white;
  background-color: purple;
  border-color: black;
  text-align: center;
}
.timeline-policy-event {
  color: white;
  background-color: darkred;
  border-color: black;
  text-align: center;
}
.timeline-claim {
  color: white;
  background-color: darkorange;
  border-color: black;
  text-align: center;
}
</style>
