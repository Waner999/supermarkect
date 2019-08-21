<template>
  <div class="stock">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加库存</span>
      </div>
      <!-- 表单 -->
      <el-form :label-position="labelPosition" label-width="100px" :model="formDate" class="form">
        <el-form-item label="商品条形码" required>
          <el-input v-model="formDate.barCode"></el-input>
        </el-form-item>
        <el-form-item label="数量" required>
          <el-input v-model.number="formDate.inventory" ></el-input>
        </el-form-item>
        <el-form-item label="进价" required>
          <el-input v-model.number="formDate.stockPrice"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addStock } from "@/apis/apis";
export default {
  data() {
    return {
      labelPosition: "left",
      formDate: {
        barCode: "",
        inventory: "",
        stockPrice: ""
      }
    };
  },
  methods: {
    submitForm() {
      //获取数据
      let barCode = this.formDate.barCode;
      let inventory = this.formDate.inventory;
      let stockPrice = this.formDate.stockPrice;

      addStock(barCode, inventory, stockPrice).then(res => {
        if (res.data == "ok") {
          this.$message({
            message: "添加库存成功",
            type: "success"
          });
          //清空输入框
          this.formDate = {
            barCode: "",
            inventory: "",
            stockPrice: ""
          };
        } else {
          this.$message({
            message: "添加库存失败",
            type: "success"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.stock {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 500px;
    .form {
      width: 300px;
    }
  }
}
</style>