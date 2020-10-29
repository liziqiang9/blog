import { createStore } from 'vuex'

export const store = createStore({
    state() {
        return {
            tags: {},
            years: {},
            dataInfo: {}
        }
    },
    mutations: {
        set_tags(state, data) {
            state.tags = data;
        },
        set_years(state, data) {
            state.years = data;
        },
        set_dataInfo(state, data) {
            state.dataInfo = data;
        }

    },
    getters: {
        tags: state => {
            return state.tags;
        },
        years: state => {
            return state.years;
        },
        dataInfo: state => {
            return state.dataInfo;
        }
    },
})
