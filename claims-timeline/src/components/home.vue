<template>
  <div id="search-display">
    <div>
      <router-link class="button" :to="'/new_policy'" exact>ADD NEW POLICY</router-link>
    </div>
    <br>
    <br>
    <h1>
      <u>Welcome to Safe Hands Policy Viewer</u>
    </h1>
    <h3>To begin search for a policy or a claim...</h3>
    <div class="center">
      <span>Search by...</span>
      <select v-model="selection">
        <option :value="item" v-for="(item, index) in options" :key="index">{{ item }}</option>
      </select>
      <div>
        <input class="myinput" type="text" v-model="policy_search" placeholder="search...">
      </div>
      <button v-on:click="search(componentItself, policy_search)">Search</button>
      <div class="results-container">
        <div v-for="(result, index) in searchResults" :key="index" class="result-display">
          <h3>{{result.policy.policy_number | to-uppercase }}</h3>
          <router-link
            class="bluebutton"
            :to="'/policy/' +  result.policy.policy_number"
            exact
          >View Policy</router-link>
        </div>
      </div>
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

<style scoped>
.button {
  background-color: green;
  padding: 0.5em;
  margin-left: 1em;
  border-radius: 5px;
  color: white;
}
.bluebutton {
  background-color: #3467c2;
  padding: 0.5em;
  border-radius: 5px;
  color: white;
  font-size: 1em;
}
h1 {
  color: #3467c2;
  font-weight: bold;
  font-size: 3.5em;
  margin-top: 2.5em;
  text-align: center;
}
h3 {
  text-align: center;
}
.center {
  text-align: center;
}
.myinput {
  width: 20em;
  text-align: center;
  margin: 1em;
}
.results-container {
  display: flex;
  justify-content: center;
}
.result-display {
  width: 30vw;
  padding: 25px;
  margin: 30px 0px;
  box-sizing: border-box;
  background: grey;
  border: 2px;
  border-style: solid;
  border-radius: 5px;
}
</style>

<style>
::-webkit-scrollbar {
  display: none;
}
#search-display {
  /* height: 100vmin;
  margin: 0em;
  padding: 0em;
  background: url("../assets/camper.jpg");
  background-repeat: no-repeat;
  background-size: 25vw auto;
  background-position: center; */
}
</style>
