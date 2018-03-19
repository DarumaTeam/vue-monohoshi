<template lang="pug">
  div
    h4 {{ volt }}
    h4 {{ value }}
</template>

<script>
import publisher from "../publisher";
import appModel from "../app-model";

export default {
  data() {
    return {
      volt: "",
      value: "",
      resultsData: []
    }
  },
  created() {
    publisher.subscribe("resultData", resultData => {
      this.resultsData.push(resultData);
      this.volt = `VIN+ : ${resultData.volt} V`;
      this.value = resultData.value;
    });
    this.volt = appModel.volt;
    this.value = appModel.value;
  }
};
</script>

<style lang="sass" scoped>
h4
  color: green;
</style>
