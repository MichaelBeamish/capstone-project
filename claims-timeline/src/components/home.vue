<template>
  <div id="search-display">
    <button>
      <router-link :to="'/new_policy'" exact>ADD NEW POLICY</router-link>
    </button>
    <h1>Search for Policies/Claims</h1>
    <span>Search by...</span>
    <select v-model="selection">
      <option :value="item" v-for="(item, index) in options" :key="index">{{ item }}</option>
    </select>
    <h2>Selection: {{selection}}</h2>
    <div>
      <input type="text" v-model="policy_search" placeholder="search by policy number...">
    </div>
    <button v-on:click="search(componentItself, policy_search)">Search</button>

    <div v-for="(result, index) in searchResults" :key="index" class="result-display">
      <h2>{{result.policy.policy_number | to-uppercase }}</h2>
      <router-link :to="'/policy/' +  result.policy.policy_number" exact>View Policy</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      componentItself: this,
      options: [
        "policy number",
        "claim number",
        "named insured",
        "address",
        "phone number"
      ],
      selection: "policy number",
      searchResults: [],
      policy_search: "",
      claim_search: "",
      named_insured_search: "",
      address_search: "",
      phone_search: ""
    };
  },
  filters: {
    //   toUppercase(value){ also works...
    "to-uppercase": function(value) {
      return value.toUpperCase();
    }
  },
  methods: {
    search: (component, policyNum) => {
      const axios = require("axios");
      axios
        .get("http://localhost:8000/search/" + policyNum)
        .then(function(response) {
          // handle success
          console.log(response.data);
          component.searchResults = [response.data];
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    }
  }
};
</script>

<style>
#search-display {
  max-width: 800px;
  margin: 0 auto;
}
.result-display {
  padding: 20px;
  margin: 20px 0px;
  box-sizing: border-box;
  background: #eee;
}
</style>
