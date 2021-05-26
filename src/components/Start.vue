<template>
  <div>
    <layout v-if="showStart">
      <template v-slot:header-icon>
        <img alt="" src="../assets/images/logo-text.svg" id="logo-text" />
      </template>
      <template v-slot:content>
        <div class="circle1 main-div" v-if="showStart">
          <div class="circle2">
            <div class="circle3" @click="startFetchData">START</div>
          </div>
        </div>
      </template>
    </layout>
    <loading-screen v-if="showLoad"></loading-screen>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Layout from "./Layout.vue";
import LoadingScreen from "./LoadingScreen.vue";

export default {
  components: { LoadingScreen, Layout },
  name: "Start",
  data() {
    return {
      showLoad: false,
      showStart: true,
    };
  },
  methods: {
    ...mapActions("dataModule", ["fetchData"]),
    startFetchData() {
      this.showLoad = true;
      this.showStart = false;
      this.fetchData();
    },
  },
  computed: {
    ...mapGetters("webSocketModule", ["getConnection"]),
  },
  created() {},
};
</script>

<style lang="less" scoped>
div {
  border-radius: 50%;
}

.circle1 {
  margin: 0 auto;
  width: 220px;
  height: 220px;
  border: 1px solid var(--border);
}

.circle2 {
  transform: translate(5%, 5%);
  width: 200px;
  height: 200px;
  border: 1px solid var(--text-muted);
}

.circle3 {
  transform: translate(5%, 5%);
  width: 180px;
  height: 180px;
  background-color: white;
  color: black;
  font-size: 32px;
  text-align: center;
  font-weight: 700;
  line-height: 180px;
}
.main-div {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#logo-text {
  height: 36px;
}
</style>