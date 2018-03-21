<template lang="pug">
  sensor-view
</template>

<script>
import median from "../util/median";
import sleep from "../util/sleep";
import MCP3425 from "../util/MCP3425";
import sensorView from "./sensor-view";
import publisher from "../publisher";

export default {
  data() {
    return {
      i2cAccess: null,
      adc: null,
      testResult: null
    }
  },
  async mounted() {
    await this.init();
    await this.run();
  },
  methods: {
    async init() {
      this.i2cAccess = await navigator.requestI2CAccess();
      const adcPort = this.i2cAccess.ports.get(1);

      this.adc = new MCP3425(adcPort, 0x68);
      await this.adc.init();
    },
    async run() {
      // 最初のデータを取るまで3秒待つ
      await sleep(3000);
      this.testResult = await this.test();

      while (true) {
        const adcData = await this.adc.read();
        publisher.publish("resultData", adcData);
        await sleep(1000);
      }
    },
    async test() {
      const testResults = [];
      while (true) {
        const adcData = await this.adc.read();
        testResults.push(adcData.value);

        // データが 100 になったら、テストを終了するために処理ループを削除
        if (testResults.length === 100) {
          break;
        }

        await sleep(1000);
      }

      // 中央値を整数にして返す
      return Math.floor(median(testResults));
    }
  },
  components: {
    sensorView
  }
}
</script>

<style lang="sass" scoped>

</style>
