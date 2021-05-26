<template>
  <div>
    <layout>
      <template v-slot:header-icon>
        <div class="col-md-1.5">
          <img alt="" src="../assets/images/arrow-left.svg" id="arrow-left" />
        </div>
      </template>
      <template v-slot:header-text>
        <div class="col" style="line-height: 70px">SCANING...</div>
      </template>

      <template v-slot:content>
        <div class="circle4 main-div">
          <div class="circle5">
            <div class="circle6"></div>
          </div>
        </div>
      </template>
    </layout>
  </div>
</template>
<script>
import Layout from "./Layout.vue";

export default {
  components: { Layout },
  name: "LoadingScreen",
  created() {},
};
</script>

<style scoped>
div {
  border-radius: 50%;
}
.circle4 {
  margin: 0 auto;
  width: 300px;
  height: 300px;
  border: 1px solid var(--border);
}

.circle5 {
  transform: translate(25%, 25%);
  width: 200px;
  height: 200px;
  border: 1px solid var(--text-muted);
}

.circle6 {
  transform: translate(48%, 46%);
  width: 100px;
  height: 100px;
  border: 1px solid var(--text-muted);
}
.main-div {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
/* #hjh {
  position: relative;
  padding-left: 20px;
}
#arrow-left {
  position: absolute;
  /* left: 0; */
</style>