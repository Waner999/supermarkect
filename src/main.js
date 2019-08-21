import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'; //使用element-ui
import 'element-ui/lib/theme-chalk/index.css';
import { token } from './apis/apis'
Vue.config.productionTip = false

// 引入echarts
import echarts from 'echarts'

//路由守卫

router.beforeEach((to,from, next) => {

   if(to.meta.requireAuth){
      //如果开启了路由守卫,就验证是否token还存在
      token(localStorage.getItem('token')).then(res => {
          if(res.data == 'ok'){
              //已登录
              next()//放行
          }else{
              //未登录
              next('/')//跳转到登陆
          }

      })
   }else{
     //没有验证,放行
     next()
   }



} )
Vue.prototype.$echarts = echarts
//使用
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')