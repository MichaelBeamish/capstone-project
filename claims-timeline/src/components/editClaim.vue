<template>
  <div>
    <div class="form-container">
      <form v-on:submit.prevent="createPolicy(thisInstance)">
        <h2>Edit Claim</h2>
        <div class="inputs-container">
          <div>
            <input
              class="myInput"
              v-model="claim_number"
              type="text"
              placeholder="claim number..."
              required
            >
          </div>
          <div class="dates-container">
            <div>
              <label>Date Of Loss:</label>
              <input v-model="effective_date" type="date" required>
            </div>
            <div>
              <label>Date Filed:</label>
              <input v-model="expiration_date" type="date" required>
            </div>
          </div>
        </div>
        <br>
        <button>Edit Claim</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      thisInstance: this,
      id: this.$route.params.id,
      options: ["Homeowner", "Renter", "Commercial"],
      selection: "Homeowner",
      named_insured: "",
      insured_location: "",
      mailing_address: "",
      phone_number: "",
      policy_number: "",
      policy_type: "",
      policy_limit: undefined,
      deductible: undefined,
      effective_date: "",
      expiration_date: ""
    };
  },
  methods: {
    createPolicy: instance => {
      const axios = require("axios");
      axios
        .post("http://localhost:8000/policies/", {
          policy_number: instance.policy_number,
          policy_type: instance.selection,
          insured_location: instance.insured_location,
          mailing_address: instance.mailing_address,
          phone_number: instance.phone_number,
          named_insured: instance.named_insured,
          deductible: instance.deductible,
          policy_limit: instance.policy_limit
        })
        .then(function(response) {
          console.log(response.data);
          return axios
            .post("http://localhost:8000/policy_events/", {
              policy_id: response.data.id,
              event_type: "policyPeriod",
              description: "Policy Period",
              startDate: instance.effective_date,
              endDate: instance.expiration_date
            })
            .then(function(response) {
              console.log(response.data);
              instance.$router.push("/policy/" + instance.policy_number);
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
form {
  background: grey;
  padding: 2em;
  border-radius: 10px;
  text-align: center;
  border-style: solid;
}
.dates-container {
  text-align: end;
  margin-right: 5px;
}
.myInput {
  width: 18em;
  text-align: center;
  margin: 4px;
}
.form-container {
  display: flex;
  justify-content: center;
  margin-top: 3em;
}
.backbutton {
  background-color: #b23850;
  padding: 0.5em;
  margin-left: 1em;
  border-radius: 5px;
  color: white;
}
</style>