import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {path: '/main',name: 'main',component: () => import('./views/Index'),

    children: [{path: '/main/mangement',name: 'mangement', meta:{ requireAuth:true }, component: () => import('./views/modules/Commodity/Com-manage.vue')}, //商品管理 
                 {path: '/main/addcommodity',name: 'addcommodity',component: () => import('./views/modules/Commodity/AddCommodity')},//添加商品

                 {path: '/main/Stock',name: 'Stock',  meta:{ requireAuth:true }, component: () => import('./views/modules/stock/Stock.vue')}, //库存管理
                 {path: '/main/AddStock',name: 'AddStock',  meta:{ requireAuth:true }, component: () => import('./views/modules/stock/AddStock') }, //添加库存

                 {path: '/main/SalesList',name: 'SalesList',  meta:{ requireAuth:true }, component: () => import('./views/modules/SalesList/SalesList.vue')}, //销售列表
                 {path: '/main/OutGoods',name: 'OutGoods',  meta:{ requireAuth:true }, component: () => import('./views/modules/SalesList/OutGoods')}, //商品出库
                 {path: '/main/GoodsReturn',name: 'GoodsReturn',  meta:{ requireAuth:true }, component: () => import('./views/modules/SalesList/GoodsReturn')}, //商品退货

                 {path: '/main/SalesStatistics',name: 'SalesStatistics',  meta:{ requireAuth:true }, component: () => import('./views/modules/Statistics/SalesStatistics.vue')}, //销售统计
                 {path: '/main/StockStatistics',name: 'StockStatistics',component: () => import('./views/modules/Statistics/StockStatistics')}, //进货统计

                 {path: '/main/Account',name: 'Account',  meta:{ requireAuth:true }, component: () => import('./views/modules/Account/Account.vue')}, //账号管理
                 {path: '/main/AddAccount',name: 'AddAccount',  meta:{ requireAuth:true }, component: () => import('./views/modules/Account/AddAccount.vue')}, //添加账号
                 {path: '/main/ChangePwd',name: 'ChangePwd',  meta:{ requireAuth:true }, component: () => import('./views/modules/Account/ChangePwd')}, //修改密码

                 {path: '/main/Vip',name: 'Vip',  meta:{ requireAuth:true }, component: () => import('./views/modules/Vip/Vip')}, //权限管理
                 {path: '/main/AddVip',name: 'AddVip', meta:{ requireAuth:true }, component: () => import('./views/modules/Vip/AddVip')}, //添加管理组
        
      ]
    }
  ]
})