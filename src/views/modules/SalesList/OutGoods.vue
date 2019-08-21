<template>
  <!-- 商品出库 -->
  <div class="outGoods">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品销售</span>
      </div>
    </el-card>
    <!-- 加入订单 -->
    <el-card class="add">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        ref="addForm"
        :model="formLabelAlign"
      >
        <el-form-item label="商品条形码" required>
          <el-input v-model="formLabelAlign.barCode"></el-input>
        </el-form-item>
        <el-form-item label="数量" required>
          <el-input v-model.number="formLabelAlign.num" placeholder="单位(kg)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">加入订单</el-button>
          <el-button @click="reset">重置出库</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="商品名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单价">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.salePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总价">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.allPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="优惠总价">
          <template slot-scope="scope">
            <span
              style="margin-left: 10px"
            >{{ scope.row.promotion =='0' ? scope.row.allPrice * 0.8 : scope.row.allPrice }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 价格 -->
      <div>
        <span>
          总价
          <span>{{ this.tableData[0].allPrice }}</span> 元
        </span>
        <span>
          优惠
          <span>{{ this.tableData[0].allPrice - (this.tableData[0].promotion == '0' ? this.tableData[0].allPrice *0.8 : this.tableData[0].allPrice ) }}</span> 元
        </span>
        <span>
          小计
          <span>{{ this.tableData[0].allPrice }}</span> 元
        </span>
      </div>
      <!-- 会员卡号 -->
      <div class="vip">
        <el-input v-model="vipcard" placeholder="请输入会员卡号"></el-input>
        <el-button type="success" @click="salegoods">确认提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { outGoods, goods } from "@/apis/apis";
export default {
  data() {
    return {
      //加入订单
      labelPosition: "right",
      //表单数据
      formLabelAlign: {
        barCode: "",
        num: ""
      },
      //表格
      tableData: [
        {
          name: "",
          time: 0,
          orderNumber: 0
        }
      ],
      vipcard: ""
    };
  },
  methods: {
    submitForm() {
      //获取 barCode
      let barCode = this.formLabelAlign.barCode;
      let num = this.formLabelAlign.num;
       outGoods(barCode, num).then(res => {
         console.log(res)
          this.tableData=res.data 
          
        });
    },
    salegoods() {
      //获取 barCode
      let barCode = this.formLabelAlign.barCode;
      let num = this.formLabelAlign.num;
      //获取名称
      let name = this.tableData[0].name;
      //获取价格
      let salePrice = this.tableData[0].salePrice;
      console.log(name);
      //是否折扣
      let promotion = this.tableData[0].promotion;
      //获取vip卡号
      let vipCard = this.vipcard;
      goods(barCode, num, name, salePrice, promotion).then(res => {
        console.log(res);
        if (res.data == "ok") {
          this.$message({
            message: "出货成功",
            type: "success"
          });
        } else if (res.data.msg == "2") {
          this.$message({
            message: `剩余库存${res.data.stockCount},库存不足`,
            type: "warning"
          });
        } else {
          this.$message({
            message: "出货失败",
            type: "warning"
          });
        }
      });
    },
    reset() {
      console.log(rest);
    }
  }
};
</script>
<style lang="less" scoped>
.add {
  .el-input {
    width: 200px;
  }
  .vip {
    width: 200px;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 100px;
    .el-button {
      margin-top: 20px;
      margin-left: 30px;
    }
  }
}
</style>