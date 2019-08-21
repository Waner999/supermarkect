<template>
  <div class="addCom">
    <el-card class="box-card" :body-style="{ padding: '0px' }">
      <div slot="header" class="clearfix">
        <span class="title">添加商品</span>
      </div>

      <div class="form-body">
        <el-form :model="ruleForm" ref="ruleForm" label-width="90px" class="ruleForm" size="mini">
          <el-form-item label="所属分类">
            <el-select v-model="ruleForm.category" placeholder=" 选择分类">
              <el-option label="水果" value="水果"></el-option>
              <el-option label="蔬菜" value="蔬菜"></el-option>
              <el-option label="饮品" value="饮品"></el-option>
              <el-option label="酒类" value="酒类"></el-option>
              <el-option label="香烟" value="香烟"></el-option>
              <el-option label="香水" value="香水"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品条形码">
            <el-input v-model="ruleForm.barCode" class="input-w"></el-input>
              <el-button type="success" @click="createCode" plain>生成条形码</el-button>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="ruleForm.name" class="input-w"></el-input>
          </el-form-item>
          <el-form-item label="商品售价">
            <el-input v-model="ruleForm.salePrice" class="input-w"></el-input>
          </el-form-item>
          <el-form-item label="市场价">
            <el-input v-model="ruleForm.marketPrice" class="input-w"></el-input>
          </el-form-item>

          <el-form-item label="商品进价">
            <el-input v-model="ruleForm.stockPrice" class="input-w"></el-input>
          </el-form-item>

          <el-form-item label="入库数量">
            <el-input v-model="ruleForm.stockCount" class="input-w"></el-input>
          </el-form-item>

          <el-form-item label="商品重量">
            <el-input v-model="ruleForm.commodityWeight" class="input-w"></el-input>
          </el-form-item>

          <el-form-item label="商品单位">
            <el-input v-model="ruleForm.commodityUnit" class="input-w"></el-input>
          </el-form-item>

          <el-form-item label="会员优惠">
            <el-radio-group v-model="ruleForm.vipDiscount">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="是否促销">
            <el-radio-group v-model="ruleForm.promotion">
              <el-radio label="启用"></el-radio>
              <el-radio label="不启用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品简介">
            <el-input type="textarea" v-model="ruleForm.goodsDesc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="add">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

  <script>
import { addCommodity } from "@/apis/apis";
export default {
  data() {
    return {
      ruleForm: {
        category: "", //分类
        barCode: "", //条形码
        name: "", //商品名称
        salePrice: 0, //售价
        marketPrice: 0, //市场价
        stockPrice: 0, //进价
        stockCount: 0, //入库数量
        commodityWeight: 0, //商品重量
        commodityUnit: "", //商品单位
        vipDiscount: 0, //会员优惠
        goodsDesc: "", //商品简介
        promotion: 0 //是否促销
      }
    };
  },
  methods: {
    createCode(){
      let  max  =  99999999
      let  min  =  10000000

       this.ruleForm.barCode =  Math.ceil(Math.random((max-min)+min)  *min)
    },
    add() {
      //解构
      let {
        category,
        barCode,
        name,
        salePrice,
        marketPrice,
        stockPrice,
        stockCount,
        commodityWeight,
        commodityUnit,
        vipDiscount,
        goodsDesc,
        promotion
      } = this.ruleForm;
      //发送请求
      addCommodity(
        category,
        barCode,
        name,
        salePrice,
        marketPrice,
        stockPrice,
        stockCount,
        commodityWeight,
        commodityUnit,
        vipDiscount,
        goodsDesc,
        promotion
      ).then(res => {
        if (res.data == "ok") {
          this.$message({
            message: "添加商品成功",
            type: "success"
          });
          this.ruleForm = {
            category: "", //分类
            barCode: "", //条形码
            name: "", //商品名称
            salePrice: 0, //售价
            marketPrice: 0, //市场价
            stockPrice: 0, //进价
            stockCount: 0, //入库数量
            commodityWeight: 0, //商品重量
            commodityUnit: "", //商品单位
            vipDiscount: 0, //会员优惠
            goodsDesc: "", //商品简介
            promotion: 0 //是否促销
          };
        } else {
          this.$message.error("添加商品错误");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.addCom {
  .el-card__body {
    padding: 0;
  }
  height: 100%;
  .box-card {
    height: 99%;
    .form-body {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .ruleForm {
        width: 412px;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
      }
      .input-w {
        width: 160px;
      }
    }
  }
}
</style>
