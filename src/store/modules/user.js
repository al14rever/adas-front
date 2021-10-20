// import axios from 'axios';


let state = {
    user: localStorage.user || {},
    token: localStorage.token || ''
}

let getters = {
    login: state => !!state.token,
    isAdmin: state => state.user.isAdmin,
    isBlock: state => state.user.isBlock,
    new_password: state => state.user.new_password,
    user: state => state.user,
    token: state => state.token,
    code: state => state.code,
}

let mutations = {
    login(state, user, token) {
        state.user = user,
        state.token = token
    },
    logout() {
        state.user = {},
        state.token = ''
    }
}

let actions = {
    login ({commit}, data) {
        return new Promise((resolve, reject) => {
            if (data.user && data.token) {                
                localStorage.setItem('user', JSON.stringify(data.user))         
                localStorage.setItem('token', data.token) 
                localStorage.setItem('code', data.user.code) 
                commit('login', data.user, data.token)
                resolve('success')
            } else {
                reject('no data')
            }
        })
    },
    logout({commit}) {
        return new Promise((resolve) => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            commit('logout')
            resolve('success')
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
};