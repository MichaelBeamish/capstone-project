<template>
  <div>
    <router-link class="backbutton" to="/" exact>Cancel</router-link>
    <div class="form-container">
      <form v-on:submit.prevent="createPolicy(thisInstance)">
        <h2>Add A New Policy</h2>
        <div>
          <label>Policy Type:</label>
          <select v-model="selection">
            <option :value="item" v-for="(item, index) in options" :key="index">{{ item }}</option>
          </select>
        </div>
        <div class="inputs-container">
          <div>
            <input
              class="myInput"
              v-model="policy_number"
              type="text"
              placeholder="policy number..."
              required
            >
          </div>
          <div>
            <input
              class="myInput"
              v-model="named_insured"
              type="text"
              placeholder="named insured..."
              required
            >
          </div>
          <div>
            <input
              class="myInput"
              v-model="insured_location"
              type="text"
              placeholder="insured location..."
              required
            >
          </div>
          <div>
            <input
              class="myInput"
              v-model="mailing_address"
              type="text"
              placeholder="mailing address..."
              required
            >
          </div>
          <div>
            <input
              class="myInput"
              v-model="phone_number"
              type="text"
              placeholder="phone number..."
              required
            >
          </div>
          <div>
            <input
              class="myInput"
              v-model="policy_limit"
              type="number"
              placeholder="policy limit..."
              required
            >
          </div>
          <div>
            <input
              class="myInput"
              v-model="deductible"
              type="number"
              placeholder="deductible..."
              required
            >
          </div>
          <div class="dates-container">
            <div>
              <label>Effective Date:</label>
              <input v-model="effective_date" type="date" required>
            </div>
            <div>
              <label>Expiration Date:</label>
              <input v-model="expiration_date" type="date" required>
            </div>
          </div>
        </div>
        <br>
        <button>Create Policy</button>
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
  background-color: darkred;
  padding: 0.5em;
  margin-left: 1em;
  border-radius: 5px;
  color: white;
}
</style>