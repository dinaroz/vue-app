<template>
  <div>
    <div class="header-wrapper">
      <div class="row" style="width:100%">
        <slot name="header-icon"></slot>
        <slot name="header-text"></slot>
        <slot name="header-action"></slot>
      </div>
    </div>
    <slot name="content"></slot>
    <slot name="footer">
      <div class="row" id="fotter-wrapper">
        <div class="col" id="version">VERSION 1.0.0</div>
        <div class="col" id="power-by">POWERED BY MY APP</div>
      </div>
    </slot>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
#fotter-wrapper {
  position: fixed;
  bottom: 0px;
  height: 84px;
  font-size: 12px;
  width: 100%;
  line-height: 84px;
}
#power-by {
  text-align: end;
  margin-right: 20px;
}
#version {
  margin-left: 20px;
}
.header-wrapper {
  height: 84px;
  margin-left: 20px;
  line-height: 84px;
}
</style>