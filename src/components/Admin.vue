<template>
  <layout>
    <template v-slot:header-icon>
      <div class="col-md-0.5">
        <img alt="" src="../assets/images/arrow-left.svg" id="arrow-left" />
      </div>
    </template>
    <template v-slot:header-text>
      <div class="col" style="line-height: 70px">RESULT</div>
    </template>
    <template v-slot:header-action>
      <div class="col serch-div">
        <label class="label-search">
          <input
            v-model="searchKey"
            type="text"
            placeholder="Quick serch..."
            class="input-search"
          />
        </label>
      </div>
    </template>
    <template v-slot:content>
      <div class="container-xxl">
        <div class="row">
          <div class="col-md-5 offset-md-1">
            <strong
              ><p class="header">{{ found }} FOUND</p>
            </strong>
            <div
              class="card"
              style="width: 100%"
              v-for="row in filtered"
              :key="row.id"
            >
              <div class="" style="margin-bottom: 15px">
                <div class="circle-wrapper">
                  <div class="circle"></div>
                </div>
                <div class="card-text">
                  <p class="card-title">
                    {{ row.taskId | uppercaseFirstLetter }}
                  </p>
                  <div class="row">
                    <div class="col-md-10 text-muted">
                      {{ row.title | uppercaseFirstLetter | shortDescription }}
                    </div>
                    <div class="col" style="text-align: end">
                      <span class="criteria-tag" style="">
                        CRITERIA {{ row.criteria }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 offset-md-1">
            <strong><p class="header">CRITERIA</p> </strong>
            <div
              class="checkbox-wrapper"
              v-for="(criteria, index) in criterias"
              :key="index"
            >
              <check-box
                :check-box-type="'criteria'"
                :check-box-val="criteria"
                :check-box-name="'criteria ' + criteria"
              ></check-box>
            </div>

            <strong
              ><p class="header" style="margin-top: 35px">TASK</p>
            </strong>
            <div class="checkbox-wrapper" v-for="task in taskArr" :key="task">
              <check-box
                :check-box-type="'taskId'"
                :check-box-name="task"
                :check-box-val="task"
              ></check-box>
            </div>
          </div>
        </div>
      </div> </template
  ></layout>
</template>
  </layout>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import CheckBox from "./CheckBox.vue";
import Layout from "./Layout.vue";

export default {
  components: { Layout, CheckBox },
  name: "Admin",
  data() {
    return {
      searchKey: "",
      found: null,
    };
  },
  computed: {
    ...mapGetters("dataModule", ["getDataToFilter"]),
    ...mapState("dataModule", {
      data: (state) => state.dataToFilter,
      criterias: (state) => state.criteria,
      taskArr: (state) => state.taskArr,
    }),
    filtered() {
      const _this = this;
      let t = _this.getDataToFilter;
      let r = t.filter(function (obj) {
        return Object.keys(obj).some(function (key) {
          return String(obj[key]).includes(String(_this.searchKey));
        });
      });
      _this.found = r.length;
      return r;
    },
  },
  methods: {
    ...mapActions("dataModule", ["filterDataByString"]),
    handleSearch() {
      let searchKey = this.searchKey;
      let d = this.getDataToFilter;
      const obj = { searchKey: searchKey, dataToFilter2: d };
      this.filterDataByString(obj);
    },
  },
  filters: {
    uppercaseFirstLetter(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    shortDescription(value) {
      if (value && value.length > 20) {
        return value.substring(0, 20) + "...";
      } else {
        return value;
      }
    },
  },
  created() {},
};
</script>

<style  lang="less" scoped>
.text-muted {
  color: var(--text-muted);
  font-size: 12px;
}
.card {
  padding: 15px;
  background-color: var(--bg-card);
  line-height: 2px;
  position: relative;
  //   height: 85px;
  border-bottom: 3px solid var(--border);
}

.circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #6e7477;
  float: left;
  margin-top: 15px;
  margin-left: 15px;
}
.circle-wrapper {
  background-color: var(--bg-card);
  float: left;
  height: 89px;
  margin-top: -15px;
  margin-left: -15px;
}
.card-text {
  display: inline-block;
  margin-left: 15px;
  width: 90%;
}
.card-title {
  font-size: 16px;
  font-weight: bold;
}
.header {
  border-bottom: 3px solid var(--border);
  margin-bottom: 35px;
  padding: 15px;
}
.serch-div {
  text-align: end;
}

.label-search {
  position: relative;
}

.label-search:before {
  content: "";
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 20px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill-rule='evenodd'%3E%3Cpath d='M16.036 18.455l2.404-2.405 5.586 5.587-2.404 2.404zM8.5 2C12.1 2 15 4.9 15 8.5S12.1 15 8.5 15 2 12.1 2 8.5 4.9 2 8.5 2zm0-2C3.8 0 0 3.8 0 8.5S3.8 17 8.5 17 17 13.2 17 8.5 13.2 0 8.5 0zM15 16a1 1 0 1 1 2 0 1 1 0 1 1-2 0'%3E%3C/path%3E%3C/svg%3E")
    center / contain no-repeat;
}

input {
  padding: 10px 30px;
  font-size: 16px;
}
.criteria-tag {
  border: 1px solid var(--text-muted);
  border-radius: 3px;
  padding: 5px;
  font-size: 12px;
  color: var(--text-muted);
  padding: 4px;
}
</style>