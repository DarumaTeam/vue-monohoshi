<template lang="pug">
  div
    p {{ onoff }} です
    img(:src="src")
    button(@click="toggleOnoff") 状態を変える
</template>

<script>
import appModel from "../app-model";
import publisher from "../publisher";

export default {
  data() {
    return {
      onoff: "OFF"
    };
  },
  computed: {
    src() {
      return `./src/image/${this.onoff}.png`
    }
  },
  created() {
    publisher.subscribe("status", onoff => {
      this.onoff = onoff;
    });
    this.onoff = appModel.status;
  },
  methods: {
    toggleOnoff() {
      appModel.toggleStatus();
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
