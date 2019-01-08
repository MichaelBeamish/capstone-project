<template>
  <div>
    <button>Cancel</button>
    <form v-on:submit.prevent="createPolicy(thisInstance)">
      <div>
        <label>Policy Number:</label>
        <input v-model="policy_number" type="text" placeholder="policy number...">
      </div>
      <div>
        <label>Policy Type:</label>
        <select v-model="selection">
          <option :value="item" v-for="(item, index) in options" :key="index">{{ item }}</option>
        </select>
      </div>
      <div>
        <label>Named Insured:</label>
        <input v-model="named_insured" type="text" placeholder="named insured...">
      </div>
      <div>
        <label>Insured Location:</label>
        <input v-model="insured_location" type="text" placeholder="insured location...">
      </div>
      <div>
        <label>Mailing Address:</label>
        <input v-model="mailing_address" type="text" placeholder="mailing address...">
      </div>
      <div>
        <label>Phone Number:</label>
        <input v-model="phone_number" type="text" placeholder="phone number...">
      </div>
      <div>
        <label>Policy Limit: $</label>
        <input v-model="policy_limit" type="number" placeholder="policy limit...">
      </div>
      <div>
        <label>Deductible: $</label>
        <input v-model="deductible" type="number" placeholder="deductible...">
      </div>
      <div>
        <label>Effective Date:</label>
        <input v-model="effective_date" type="date">
      </div>
      <div>
        <label>Expiration Date:</label>
        <input v-model="expiration_date" type="date">
      </div>
      <button>Create Policy</button>
    </form>
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
</style>