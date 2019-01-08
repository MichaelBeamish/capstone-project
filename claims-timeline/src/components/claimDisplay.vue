<template>
  <div>
    <div>
      <router-link :to="'/policy/' + policy_number" exact>Back To Policy {{policy_number}}</router-link>
    </div>
    <button>EDIT CLAIM</button>
    <button>ADD EVENT</button>
    <h1>Claim {{id}}</h1>
    <h2>
      Status:
      <span v-if="status === 'CLOSED'" class="red-status">{{status}}</span>
    </h2>
    <h2>
      Status:
      <span v-if="status === 'OPEN'" class="green-status">{{status}}</span>
    </h2>
    <h2>Insured: {{named_insured}}</h2>
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
            className: "timeline-policy-period"
          });
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
