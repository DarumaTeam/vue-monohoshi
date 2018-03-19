<template lang="pug">
  div#root
    sensor
    graph
    status
</template>

<script>
import sensor from "./sensor";
import graph from "./graph";
import status from "./status";

export default {
  components: {
    sensor,
    graph,
    status
  }
}
</script>

<style lang="sass" scoped>
div
  background-color: lightcyan
  width: 100%
  height: 100%
</style>
