// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import productData from './product.js'
Vue.config.productionTip = false
Vue.use(Vuex)
function getFilterArray (array) {
    return [...new Set(array)]
}
const store = new Vuex.Store({
    state: {
    // 商品列表数据
        productList: [],
        // 购物车数据
        cartList: []
    },
    getters: {
        brands: state => {
            const brands = state.productList.map(item => item.brand)
            return getFilterArray(brands)
        },
        colors: state => {
            return getFilterArray(state.productList.map(item => item.color))
        }
    },
    mutations: {
    // 添加商品列表
        setProductList (state, data) {
            state.productList = data
        },
        // 添加到购物车
        addCart (state, id) {
            // 先判断购物车是否已有，如果有，数量+1
            const isAdded = state.cartList.find(item => item.id === id)
            if (isAdded) {
                isAdded.count++
            } else {
                state.cartList.push({
                    id: id,
                    count: 1
                })
            }
        },
        // 修改商品数量
        editCartCount (state, payload) {
            const product = state.cartList.find(item => item.id === payload.id)
            product.count += payload.count
        },
        deleteCart (state, id) {
            const index = state.cartList.findIndex(item => item.id === id)
            state.cartList.splice(index, 1)
        },
        emptyCart (state) {
            state.cartList = []
        }
    },
    actions: {
    // 模拟数据
        getProductList (ctx) {
            setTimeout(() => {
                ctx.commit('setProductList', productData)
            }, 500)
        },
        // 购买
        buy (ctx) {
            //
            return new Promise(resolve => {
                setTimeout(() => {
                    ctx.commit('emptyCart')
                    resolve()
                }, 500)
            })
        }
    }
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    store: store,
    template: '<App/>'
})
