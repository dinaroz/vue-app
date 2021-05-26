import Vue from '../main'

const state = {
    connection: null,
    isConnected: false,
    message_scale: {},
    message_machine_status: {},
    message_worker: {}
};

const actions = {
    setConnection({ commit }) {
        commit('SOCKET_CONNECTION');
    },
    setSocketOpen({ commit }) {
        commit('SOCKET_ONOPEN');
        setTimeout(() => {
            Vue.$router.push("/start").catch(() => { })
        }, 2000);
    },
    setSocketClose({ commit }) {
        commit('SOCKET_ONCLOSE');
    },
    setSocketMessage({ commit }, params) {
        commit('SOCKET_ONMESSAGE', params);
    },
    setSocketError({ commit }, event) {
        commit('SOCKET_ONERROR', event.data);
    }
}

const mutations = {
    SOCKET_CONNECTION(state) {
        console.info("WebSocket start connected");
        state.connection = new WebSocket("ws://localhost:3000");;
    },
    SOCKET_ONOPEN(state) {
        console.info("WebSocket connected");
        state.isConnected = true;
    },
    SOCKET_ONCLOSE(state) {
        state.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
        console.error(state, event);
    },
    SOCKET_ONMESSAGE(state, params) {
        // let object = JSON.parse(params.data);
        // console.log(object)
        // if (object.type == "message"){
        //     alert(object.type)
        //     Vue.$router.push("/").catch(() => { })
        // }
    },
    SOCKET_RECONNECT_ERROR(state) {
        state.reconnectError = true;
    }
};

const getters = {
    message(state) {
        return state.message;
    },
    getConnection(state) {
        return state.connection;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}