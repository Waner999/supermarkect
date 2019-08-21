//ajax请求

import axios from 'axios';

//ip
const IP = 'http://172.16.14.188:3000'

//登陆
export function login(acc, pwd) {
    return axios.post(IP + '/login', {
        acc, //账户名
        pwd //密码
    })
}

//添加账号
export function addAccount(acc, pwd, userGroup) {
    return axios.post(IP + '/main/AddAccount', {
        acc, //账户名
        pwd, //密码
        userGroup //管理组
    })
}

//账号管理

export function account(curpage, row) {
    return axios.get(IP + '/main/Account', {
        params: {
            curpage,
            row
        }
    })
}

//修改密码
export function changePwd(pwd, newpwd, userid) {
    return axios.post(IP + '/main/ChangePwd', {
        newpwd, //新密码
        pwd, //原密码
        userid //用户id
    })
}

//删除账号
export function delAcc(id) {
    return axios.get(IP + '/main/deleteAcc', {
        params: {
            id,
        }
    })
}



//Token令牌

export function token(tokenid) {
    return axios.get(IP + '/gettoken', {
        params: {
            tokenid, //tokenID
        }

    })
}


//添加商品
export function addCommodity(category, barCode, name, salePrice, marketPrice, stockPrice, stockCount, commodityWeight, commodityUnit, vipDiscount, goodsDesc, promotion) {
    return axios.post(IP + '/main/addCommodity', {
        category, //分类
        barCode, //条形码
        name, //商品名称
        salePrice, //售价
        marketPrice, //市场价
        stockPrice, //进价
        stockCount, //入库数量
        commodityWeight, //商品重量
        commodityUnit, //商品单位
        vipDiscount, //会员优惠
        goodsDesc, //商品简介
        promotion //是否促销
    })
}


//商品管理
export function mangement(curpage, row) {
    return axios.get(IP + '/main/mangement', {
        params: {
            curpage,
            row
        }
    })
}

//商品管理 -- 修改商品
export function changemangement(from) {
    return axios.get(IP + '/main/changemangement', {
        params: from
    })
}

//库存管理 -- 添加库存
export function addStock(barCode, inventory, stockPrice) {
    return axios.get(IP + '/main/addStock', {
        params: {
            barCode,
            inventory,
            stockPrice
        }
    })
}

export function stock(curpage, row) {
    return axios.get(IP + '/main/stock', {
        params: {
            curpage,
            row
        }
    })
}


//出货管理 --  商品出库
export function outGoods(barCode, num) {
    return axios.get(IP + '/main/outGoods', {
        params: {
            barCode,
            num
        }
    })
}

//出货管理 --  确认出库
export function goods(barCode, num, name, salePrice, promotion) {
    return axios.get(IP + '/main/goods', {
        params: {
            barCode,
            num,
            name,
            salePrice,
            promotion
        }
    })
}

//出货管理 -- 销售列表

export function salesList(curpage, row) {
    return axios.get(IP + '/main/salesList', {
        params: {
            curpage,
            row
        }
    })
}

//出货管理 -- 获取退货列表

export function goodsReturn(orderNumber) {
    return axios.get(IP + '/main/goodsReturn', {
        params: {
            orderNumber
        }
    })
}

//出货管理 -- 确认退货
export function out(orderNumber) {
    return axios.get(IP + '/main/isout', {
        params: {
            orderNumber
        }
    })
}

//种类数据统计

export function statistics() {
    return axios.get(IP + '/statistics')
}

//会员管理  --  添加会员

export function setvip(name, vipCard) {
    return axios.get(IP + '/setVip', {
        params: {
            name,
            vipCard
        }
    })
}









// params: {
//         barCode, //条形码
//         name,    //商品名称
//         category, //分类
//         salePrice, //售价
//         promotion, //促销价
//         marketPrice,//市场价
//         stockCount,//库存
//         allstock    //销售总额

//     }