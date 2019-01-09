<template>
  <div class="container">
    <div class="content">
      <h1>FAQ:</h1>
      <br>
      <div class="question">
        <b>Q: How do you do this?</b>
        <br>
        <i>Like this!</i>
        <br>
        <br>
      </div>
      <hr>
      <div class="rightme question">
        <b>Q: How do you do that?</b>
        <br>
        <i>Like that!</i>
        <br>
        <br>
      </div>
      <hr>
    </div>
    <div class="question">
      <b>Q: How do you do this?</b>
      <br>
      <i>Like this!</i>
      <br>
      <br>
    </div>
    <hr>
    <div class="rightme question">
      <b>Q: How do you do that?</b>
      <br>
      <i>Like that!</i>
      <br>
      <br>
    </div>
    <hr>
    <div class="question">
      <b>Q: How do you do this?</b>
      <br>
      <i>Like this!</i>
      <br>
      <br>
    </div>
    <hr>
    <div class="rightme question">
      <b>Q: How do you do that?</b>
      <br>
      <i>Like that!</i>
      <br>
      <br>
    </div>
    <hr>
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
.rightme {
  text-align: right;
}
.question {
  margin-left: 4em;
  margin-right: 4em;
}
</style>
