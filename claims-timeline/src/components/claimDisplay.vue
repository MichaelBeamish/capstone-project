<template>
  <div>
    <div class="claim-info">
      <div class="mybuttons">
        <router-link
          class="back-button"
          :to="'/policy/' + policy_number"
          exact
        >Back to policy {{policy_number}}</router-link>
        <router-link class="button-b" :to="'/edit_claim'" exact>EDIT CLAIM INFO</router-link>
      </div>
      <br>
      <h1>Claim: {{id}}</h1>
      <h3>{{named_insured}}</h3>
      <h3>{{insured_location}}</h3>
      <h4 v-if="status === 'CLOSED'">
        Status:
        <span class="red-status">{{status}}</span>
      </h4>
      <h4 v-if="status === 'OPEN'">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      status: "CLOSED",
      named_insured: "",
      insured_location: "",
      policy_type: "",
      policy_number: "",
      policy_limit: undefined,
      deductible: undefined,
      groups: [
        {
          id: 0,
          content: "Claim"
        },
        {
          id: 1,
          content: "Claim Events"
        }
      ],
      items: [],
      options: {}
    };
  },
  created() {
    this.$http
      .get("http://localhost:8000/claimsDisplay/" + this.id)
      .then(function(data) {
        console.log(data.body);
        this.named_insured = data.body.policy.named_insured;
        this.insured_location = data.body.policy.insured_location;
        this.policy_type = data.body.policy.policy_type;
        this.policy_number = data.body.policy.policy_number;
        this.policy_limit = data.body.policy.policy_limit;
        this.deductible = data.body.policy.deductible;

        let timelineIndex = 1;

        let closeDate = new Date();
        if (
          data.body.claim.date_closed !== null &&
          data.body.claim.date_closed !== undefined &&
          data.body.claim.date_closed !== ""
        ) {
          closeDate = data.body.claim.date_closed;
        } else {
          this.status = "OPEN";
        }

        this.items.push({
          id: data.body.claim.claim_number,
          group: 0,
          content: data.body.claim.claim_number,
          start: new Date(data.body.claim.date_of_loss),
          end: closeDate,
          className: "timeline-claim"
        });
        timelineIndex++;

        data.body.claim_events.forEach(event => {
          this.items.push({
            id: timelineIndex,
            group: 1,
            content: event.event_type.toUpperCase() + ": " + event.description,
            start: new Date(event.startDate),
            className: "timeline-claim-event"
          });
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
.back-button {
  background-color: darkred;
  padding: 0.5em;
  margin-left: 1em;
  border-radius: 5px;
  color: white;
}
.red-status {
  color: darkred;
}
.green-status {
  color: green;
}
.claim-info {
  margin: 1em;
}
</style>


<style>
.timeline-claim-event {
  color: white;
  background-color: darkred;
  border-color: black;
}
.timeline-claim {
  color: white;
  background-color: darkorange;
  border-color: black;
}
</style>
