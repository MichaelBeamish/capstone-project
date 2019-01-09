<template>
  <div class="container">
    <div class="content">
      <h1>Contact Me:</h1>
      <br>
      <br>
      <br>
      <div class="words">
        <h3>Phone Number</h3>
        <p>(480) 369-0135</p>
        <h3>Github</h3>
        <p>
          <a href="#">Link</a>
        </p>
        <h3>LinkedIn</h3>
        <p>
          <a href="#">Link</a>
        </p>
        <h3>Resume</h3>
        <p>
          <a href="#">Link</a>
        </p>
        <h3>Portfolio</h3>
        <p>
          <a href="#">Link</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.container {
  background-color: lightblue;
  border-radius: 10px;
  border-style: solid;
  border-color: black;
  padding: 1em;
  margin-top: 2em;
  height: 75vh;
  width: 80vw;
}
.words {
  font-size: 1.1em;
  text-align: center;
}
</style>
