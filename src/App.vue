<template>
  <div id="app" >
    <router-view />
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  data: function () {
    return {
      connection: null,
    };
  },
  computed: {
    ...mapGetters("webSocketModule", ["getConnection"]),
  },
  methods: {
    ...mapActions("webSocketModule", ["setConnection"]),
    sendMessage: function (message) {
      this.connection.send(message);
    },
  },
  created: function () {

  },
};
</script>

<style lang="less">
@import "./assets/style/style.less";
@import "./assets/style/bootstrap-grid.min.less";

body {
  background-color: var(--bg-body);
  color: var(--text-base);
  // border: 1px solid var( --border);
}

</style>
