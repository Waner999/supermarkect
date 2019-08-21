var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var token = require('jsonwebtoken')
var multiparty = require('multiparty')

//创建连接对象
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'supermarket'
});
//发请求时 连接数据库
con.connect();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
//登陆
router.post('/login', (req, res) => {
  let data = req.body
  console.log(data)
  //定义sql语句
  let sql = `SELECT * FROM user WHERE acc='${data.acc}' AND pwd='${data.pwd}'`
  //进入数据库连接数据
  con.query(sql, (err, result) => {
    if (err) {
      throw err //抛出错误
    } else {
      //拿到结果
      if (result.length > 0) {
        let tokenid = token.sign({}, 'waner', {
          expiresIn: 60 * 60 * 1
        })

        let userid = result[0].id; //拿到id
        let userGroup = result[0].userGroup; //拿到管理组
        //证明有数据,登陆成功
        res.send({
          data: 'ok',
          id: userid,
          userGroup: userGroup,
          token: tokenid,
          avatarUrl: result[0].avatarUrl
        })

      } else {
        res.send('fail')
      }
    }
  })
})
//注册
router.post('/main/AddAccount', (req, res) => {
  let data = req.body
  //定义sql语句
  let addsql = `INSERT INTO user(acc,pwd,userGroup) VALUES('${data.acc}','${data.pwd}','${data.userGroup}')`
  let seesql = `SELECT * FROM user WHERE acc='${data.acc}'`


  con.query(seesql, (err, result) => {
    if (err) throw err

    if (result.length > 0) {
      res.send('2')
    } else {
      con.query(addsql, (err2, result2) => {
        if (err2) throw err2

        if (result2) {
          res.send('ok')
        } else {
          res.send('fail')
        }
      })
    }

  })
})

//修改密码
router.post('/main/ChangePwd', (req, res) => {

  let data = req.body; //请求数据

  //定义sql
  let Changesql = `UPDATE user SET pwd ='${data.newpwd}' WHERE id = ${data.userid}`
  let OldSql = `SELECT	*	 FROM user WHERE  pwd ='${data.pwd}' AND id = ${data.userid}`

  //确认原密码正确 再修改密码
  con.query(OldSql, (err, result) => {
    if (err) throw err

    if (result.length > 0) {
      con.query(Changesql, (err, changeRes) => {
        if (err) throw err

        if (changeRes) {
          res.send('ok')
        } else {
          res.send('fail')
        }
      })
    } else {
      res.send('2')
    }

  })

})
//账户管理

router.get('/main/Account', (req, res) => {

  let data = req.query
  //每页条数
  let row = data.row
  //第几页
  let curpage = data.curpage

  //定义page
  let page = (curpage - 1) * row

  //定义sql
  let sql = `SELECT acc,id,userGroup FROM user LIMIT ${page} ,${row} `

  let maxSql = `SELECT COUNT(*) FROM user`
  con.query(sql, (err, data) => {
    if (err) throw err

    //拿到用户数据
    con.query(maxSql, (err, result) => {
      if (err) throw err

      //拿到最大页数

      res.send({
        data,
        total: result[0]['COUNT(*)']
      })


    })

  })
})

//删除账号
router.get('/main/deleteAcc', (req, res) => {
  let id = req.query.id

  let sql = `DELETE FROM user WHERE id=${id};`

  con.query(sql, (err, result) => {
    if (err) throw err

    if (result) {
      res.send('ok')
    } else {
      res.send('fail')
    }


  })

})


//验证token

router.get('/gettoken', (req, res) => {
  let tokenid = req.query.tokenid
  token.verify(tokenid, 'waner', (err, decode) => {
    if (err) {
      //失效
      res.send('fail')
    } else {
      //还存在
      res.send('ok')
    }
  })
})



//添加商品

router.post('/main/addCommodity', (req, res) => {
  let data = req.body
  data.vipDiscount = data.vipDiscount == '享受' ? 1 : 0
  data.promotion = data.promotion == '启用' ? 1 : 0
  console.log(data)
  //定义sql
  let sql = `INSERT INTO commodity(category, barCode, name, salePrice, marketPrice, stockPrice, stockCount, commodityWeight, commodityUnit, vipDiscount, goodsDesc, promotion) VALUES('${data.category}',${data.barCode},'${data.name}',${data.salePrice},${data.marketPrice},${data.stockPrice},${data.stockCount},${data.commodityWeight},'${data.commodityUnit}',${data.vipDiscount},'${data.goodsDesc}',${data.promotion})`
  con.query(sql, (err, result) => {
    if (err) throw err
    if (result) {
      res.send('ok')
    } else {
      res.send('fail')
    }
  })

})

//商品管理

router.get('/main/mangement', (req, res) => {

  //接收数据
  let data = req.query
  let curpage = data.curpage
  let row = data.row

  let startPage = (curpage - 1) * row


  let sql = `SELECT barCode, name,category, salePrice, promotion, marketPrice, stockCount FROM commodity  LIMIT ${startPage} ,${row}`
  let totalSql = `SELECT COUNT(*) FROM commodity`
  con.query(sql, (err, data) => {
    if (err) throw err

    //拿到用户数据
    con.query(totalSql, (err, result) => {
      if (err) throw err

      //拿到最大页数
      res.send({
        data,
        total: result[0]['COUNT(*)']
      })


    })
  })
})

//商品管理 -- 修改商品

router.get('/main/changemangement', (req, res) => {
  //获取参数
  let data = req.query
  //条形码
  let barCode = data.barCode
  //商品名称
  let name = data.name
  //售价
  let salePrice = data.salePrice
  //市场价
  let marketPrice = data.marketPrice

  //sql
  let sql = `UPDATE commodity SET name = '${name}', salePrice = ${salePrice },marketPrice = ${marketPrice} WHERE barCode = ${barCode}`

  //执行

  con.query(sql, (err, result) => {
    if (err) throw err

    if (result) res.send('ok')
    else res.send('fail')
  })
})


//进货管理 -- 添加库存
router.get('/main/addStock', (req, res) => {
  //接收参数
  let data = req.query
  //条形码
  let barCode = data.barCode
  //入库数量
  let inventory = data.inventory
  //进价
  let stockPrice = data.stockPrice

  //sql
  let sql = `UPDATE commodity SET inventory=${inventory},stockPrice=${stockPrice}  WHERE barCode=${barCode}`
  con.query(sql, (err, result) => {
    if (err) throw err

    if (result) res.send('ok')
    else res.send('fail')
  })

})

//进货管理 -- 库存管理

router.get('/main/stock', (req, res) => {
  //拿取数据
  let data = req.query
  //当前页
  let curpage = data.curpage
  //行
  let row = data.row

  //定义page
  let stratePage = (curpage - 1) * row

  //定义sql
  let sql = `SELECT * FROM commodity  WHERE inventory != 0  LIMIT ${stratePage} ,${row} `

  let maxSql = `SELECT COUNT(*) FROM sell`
  con.query(sql, (err, data) => {
    if (err) throw err

    //拿到用户数据
    con.query(maxSql, (err, result) => {
      if (err) throw err

      //拿到最大页数
      res.send({
        data,
        total: result[0]['COUNT(*)']
      })
    })
  })
})



//出货管理 -- 商品出库
router.get('/main/outGoods', (req, res) => {
  let data = req.query
  console.log(data)
  let barCode = data.barCode
  let num = data.num
  //查询
  let checkSql = `SELECT name,salePrice,promotion FROM commodity WHERE barCode = ${barCode}`

  con.query(checkSql, (err, result) => {
    if (err) throw err


    if (result) {
      //定义数据

      let tabledata = [{
        name: result[0].name,
        num: num,
        salePrice: result[0].salePrice,
        allPrice: result[0].salePrice * num,
        promotion: result[0].promotion
      }];
      console.log(tabledata[0])
      res.send(tabledata)
      // name: result[0].name,
      // num: num,
      // salePrice: result[0].salePrice,
      // allPrice: result[0].salePrice * num,
      // promotion: result[0].promotion == '0' ? tabledata.allPrice * 0.8 : tabledata.allPrice
    }

  })
})

//出货管理 -- 确认出库
router.get('/main/goods', (req, res) => {
  let data = req.query
  let barCode = data.barCode
  let num = data.num
  let name = data.name
  // let vipCard = data.vipCard
  let salePrice = data.salePrice
  let promotion = data.promotion

  //获取时间

  let date = new Date()
  let year = date.getFullYear(); //获取完整的年份(4位,1970-????)
  let mon = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
  mon = mon < 10 ? '0' + mon : mon
  let day = date.getDate(); //获取当前日(1-31)
  day = day < 10 ? '0' + day : day

  let hours = date.getHours(); //获取当前小时数(0-23)
  hours = hours < 10 ? '0' + hours : hours

  let min = date.getMinutes(); //获取当前分钟数(0-59)

  min = min < 10 ? '0' + min : min

  let sec = date.getSeconds(); //获取当前秒数(0-59)
  sec = sec < 10 ? '0' + sec : sec


  let minl = date.getMilliseconds(); //获取当前毫秒数(0-999)

  //订单号
  let orderNumber = year + mon + day + hours + min + sec + min + minl
  //时间
  let time = `${year}-${mon}-${day}  ${hours}:${min}:${sec}`

  console.log(time)
  console.log(orderNumber)

  //sql

  //出库并存入销售表
  let sellSql = `INSERT INTO sell (orderNumber,time,name,num,salePrice,promotion) VALUES('${orderNumber}','${time}','${name}',${num},${salePrice},${promotion})`


  let checkSql = `	SELECT stockCount FROM commodity WHERE barCode= ${barCode} `


  con.query(checkSql, (err, result) => {
    if (err) throw err

    if (num > result[0].stockCount) {
      //数量大于 库存  返回2
      res.send({
        msg: '2',
        stockCount: result[0].stockCount
      })
    } else {
      //否则出库
      con.query(sellSql, (err, result) => {
        if (err) throw err

        if (result) {
          res.send('ok')
        } else {
          res.send('fail')
        }
      })
    }
  })



})

//出货管理 -- 销售列表

router.get('/main/salesList', (req, res) => {

  //拿取数据
  let data = req.query
  //当前页
  let curpage = data.curpage
  //行
  let row = data.row

  //定义page
  let stratePage = (curpage - 1) * row

  //定义sql
  let sql = `SELECT * FROM sell LIMIT ${stratePage} ,${row} `

  let maxSql = `SELECT COUNT(*) FROM sell`
  con.query(sql, (err, data) => {
    if (err) throw err

    //拿到用户数据
    con.query(maxSql, (err, result) => {
      if (err) throw err

      //拿到最大页数
      res.send({
        data,
        total: result[0]['COUNT(*)']
      })
    })
  })
})

//出货管理 -- 获取退货列表

router.get('/main/goodsReturn', (req, res) => {
  //获取数据
  let data = req.query
  //获取订单号
  let orderNumber = data.orderNumber

  //sql

  let checksql = `SELECT time,name,salePrice,num FROM sell WHERE orderNumber = ${orderNumber}`

  con.query(checksql, (err, result) => {
    if (err) throw err

    if (result) {
      res.send({
        msg: 'ok',
        data: result
      })
    } else {
      res.send('fail')
    }
  })



})

//出货管理 -- 确认退货 

router.get('/main/isout', (req, res) => {

  //获取参数
  let data = req.query
  //订单号
  let orderNumber = data.orderNumber

  //sql
  let sql = `UPDATE sell SET  isOut =1   WHERE orderNumber = ${orderNumber}`

  con.query(sql, (err, result) => {

    if (err) throw err

    if (result) res.send('ok')
    else res.send('fail')
  })


})


//修改头像

router.post('/upload', function (req, res) {
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({
    uploadDir: './public/images/'
  });

  //上传完成后处理
  form.parse(req, function (err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);
    if (err) {
      console.log('parse error: ' + err);
      //错误
    } else {
      var inputFile = files.inputFile[0];
      var uploadedPath = inputFile.path;
      //成功

      //拼接url
      let str = uploadedPath.replace(/public\\/, 'http://172.16.14.188:3000/')
      let url = str.replace(/\\/, '/')

      //拼接sql
      let sql = `UPDATE user SET avatarUrl='${url}' WHERE id=${req.query.id}`
      //注意uploadedPath路径的转化!!!!
      con.query(sql, (err, result) => {
        if (err) throw err

        if (result) {
          res.send(url)
        } else {
          res.send('fail')
        }
      })
    }
  });
});


//种类数据统计
router.get('/statistics', (req, res) => {

  //sql
  let sql = `SELECT
  count(category = '饮品' OR NULL) AS 饮品,
  count(category = '香水' OR NULL) AS 香水,
  count(category = '香烟' OR NULL)  AS 香烟,
  count(category = '酒类' OR NULL)  AS 酒类,
  count(category = '水果' OR NULL)  AS 水果,
  count(category = '蔬菜' OR NULL)  AS 蔬菜
FROM commodity`

  con.query(sql, (err, result) => {
    if (err) throw err

    if (result.length > 0) res.send(result)
    else res.send('fail')
  })
})



//会员管理 -- 添加会员

router.get('/setVip',(req,res) => {
    //获取数据
    let data  = req.query
    //姓名
    let name = data.name
    //卡号
    let vipCard = data.vipCard

    //sql 
    let sql = `INSERT INTO vipuser(name,vipCard) VALUES('${name}',${vipCard})`
    
    con.query(sql , (err,result) => {
      if(err)  throw err

      if(result) res.send('ok')
      else res.send('fail')
    })
})
module.exports = router;