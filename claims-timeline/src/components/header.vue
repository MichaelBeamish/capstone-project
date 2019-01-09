<template>
  <nav>
    <span class="icon-container">
      <img class="logo" src="src/assets/insurance.png">
      <span class="title">Safe Hands Insurance</span>
      <span class="reserved">®</span>
    </span>
    <span class="links-container">
      <router-link class="mylink" to="/" exact>Home</router-link>
      <router-link class="mylink" to="/about" exact>About</router-link>
      <router-link class="mylink" to="/faq" exact>FAQ</router-link>
      <router-link class="mylink" to="/contact" exact>Contact Me</router-link>
      <router-link class="mylink" to="/policy/D98-458-8945" exact>D98-458-8945</router-link>
    </span>
  </nav>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.logo {
  width: 5em;
  padding-top: 5px;
  padding-bottom: 10px;
  margin: 0.5em;
}
nav {
  background: grey;
  border-bottom: 2px;
  border-bottom-style: solid;
  border-bottom-color: black;
  margin-bottom: 1em;
}
.title {
  color: #3d4653;
  font-size: 2em;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-style: oblique;
  font-weight: bold;
}
.reserved {
  color: #3d4653;
  font-size: 0.75em;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-style: oblique;
  font-weight: bold;
}
.icon-container {
  margin-left: 1em;
}
.links-container {
  margin-left: 58em;
}
.mylink {
  background-color: #3467c2;
  padding: 0.75em;
  border-radius: 12px;
  color: white;
  font-size: 1.2em;
}
.router-link-active {
  background: white;
  color: black;
}
</style>
