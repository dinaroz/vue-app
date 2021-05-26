<template>
  <label class="checkbox-button">
    <input
      type="checkbox"
      class="checkbox-button__input"
      id="choice1-1"
      name="choice1"
      :data-toggle="checkBoxType"
      :value="getVal"
      @change="handleCheckBoxClick"
    />
    <span class="checkbox-button__control"></span>
    <span class="checkbox-button__label">
      {{ checkBoxName }}
    </span>
  </label>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "CheckBox",
  data() {
    return {
      selected: false,
      selectedValue: "",
    };
  },
  props: {
    checkBoxType: {
      type: String,
      default: null,
    },
    checkBoxVal: {
      default: null,
    },
    checkBoxName: {
      type: String,
      default: null,
    },
  },
  computed: {
    getVal() {
      return (this.selectedValue = this.checkBoxVal);
    },
    ...mapGetters("dataModule", ["dataJson"]),
  },
  methods: {
    ...mapActions("dataModule", ["filterDataByCriteria", "filterDataByTaskId"]),
    handleCheckBoxClick(e) {
      this.selected = !this.selected;
      let filterType = e.currentTarget.getAttribute("data-toggle");
      let filterVal = this.selectedValue;
      const selectedObj = { filterType: filterType, filterVal: filterVal };
      this.filterDataByCriteria({
        selectedObj: selectedObj,
        selected: this.selected,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.checkbox-button {
  cursor: pointer;
}

input[type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
}

input {
  font-size: 1rem;
  line-height: 1.5;
  padding: 11px 23px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  outline: 0;
  background-color: transparent;
}

.checkbox-button__input {
  opacity: 0;
  position: absolute;
}

.checkbox-button__control {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 12px;
  vertical-align: middle;
  background-color: inherit;
  border: 2px solid var(--text-base);
  border-radius: 5px;
}

.checkbox-button__input:checked + .checkbox-button__control:after {
  content: "";
  display: block;
  position: absolute;
  top: 5px;
  left: 5px;
  width: 10px;
  height: 10px;
  border-radius: 1px;
  background-color: var(--text-base);
}
.checkbox-button__control {
  transform: scale(0.75);
}
.checkbox-button__label {
  line-height: 44px;
}
</style>