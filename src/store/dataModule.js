import Vue from '../main'

const state = {
    data: null,
    criteria: null,
    dataToFilter: null,
    taskArr: null,
    temp:null
};

const actions = {
    fetchData({ commit, rootState, dispatch }) {
        try {
            const con = rootState.webSocketModule.connection;
            con.send(JSON.stringify({
                "type": "FETCH-DATA",
            }))
            con.onmessage = function (event) {
                let response = JSON.parse(event.data)
                if (response.status == "success") {

                    dispatch("setCriteria", JSON.parse(response.jsonData))
                    dispatch("setTasks", JSON.parse(response.jsonData))

                    commit("DATA", JSON.parse(response.jsonData))
                    commit("DATATOFILTER", JSON.parse(response.jsonData))

                    setTimeout(() => {
                        Vue.$router.push("/admin").catch(() => { })
                    }, 2000);
                } else {
                    console.log(event);
                }
            }
            //todo dispatch on message module
        } catch (err) {
            console.log(err);
        }
    },

    setData({ commit }, data) {
        commit('DATA', data);
    },

    setCriteria({ commit }, data) {
        let criteriaArr = [];
        for (let index in data) if (data.hasOwnProperty(index)) {
            const obj = data[index];
            for (let key in obj) if (obj.hasOwnProperty(key)) {
                if (key == "criteria" && !criteriaArr.includes(obj[key])) {
                    criteriaArr.push(obj[key])
                }
            }
        };
        commit('CRITERIA', criteriaArr);
    },

    setTasks({ commit }, data) {
        let taskArr = [];
        for (let index in data) if (data.hasOwnProperty(index)) {
            const obj = data[index];
            for (let key in obj) if (obj.hasOwnProperty(key)) {
                if (key == "taskId" && !taskArr.includes(obj[key])) {
                    taskArr.push(obj[key])
                }
            }
        };
        commit('TASKS', taskArr);
    },

    filterDataByCriteria({ commit, state }, data) {
        let filterData = state.dataToFilter;

        switch (data.selected) {

            case true:
                let filter1 = state.data.filter(function (obj) {
                    return (obj[data.selectedObj.filterType] === data.selectedObj.filterVal);
                });
                if (filterData.length === state.data.length) {
                    filterData = filter1;

                } else {
                    filterData = filterData.concat(filter1)
                }
                commit("DATATEMP", filterData)

                const uniqueArray = filterData.filter((task, index) => {
                    const _thing = JSON.stringify(task);
                    return index === filterData.findIndex(obj => {
                        return JSON.stringify(obj) === _thing;
                    });
                });
                commit("DATATOFILTER", uniqueArray)
                break;

            case false:
                // let count = 0;
                // for(let i=0; i < state.temp.length; i++){
                //     console.log(state.temp[i][data.selectedObj.filterType],data.selectedObj.filterVal)
                //     if (state.temp[i][data.selectedObj.filterType] === data.selectedObj.filterVal){
                //         count++
                //     }
                // }
                // if ((count <= 1)) {
                    let filter2 = state.dataToFilter.filter(function (obj) {
                        return (obj[data.selectedObj.filterType] != data.selectedObj.filterVal);
                    });
                    if (filter2.length === 0) {
                        filter2 = state.data;
                    }
                    commit("DATATOFILTER", filter2)
                // } else {

                // }
                break;

        }

    },
    // filterDataByString({ commit, state }, data) {
    //     // let filterData = state.dataToFilter;
    //     let filterObj;
    //     if (data.searchKey) {
    //         filterObj = data.dataToFilter2.filter(function (obj) {
    //             return Object.keys(obj).some(function (key) {
    //                 return String(obj[key]).includes(String(data.searchKey));
    //             })
    //         });


    //     } else {
    //         alert("fdd")
    //         filterObj = state.dataToFilter;
    //     }
    //     commit("DATATOFILTER", filterObj)
    // }

};

const mutations = {
    DATA(state, data) {
        state.data = data;

    },
    DATATEMP(state, data) {
        state.temp = data;

    },
    DATATOFILTER(state, data) {
        state.dataToFilter = data;
    },
    CRITERIA(state, data) {
        state.criteria = data;
    },
    SELECTEDARR(state, data) {
        state.selectedArr = data;
    },
    TASKS(state, data) {
        state.taskArr = data;
    },
};

const getters = {
    dataJson(state) {
        return state.data;
    },
    getDataToFilter(state) {
        return state.dataToFilter;
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}