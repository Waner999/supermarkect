<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="分类">
          <el-select v-model="formInline.region" placeholder="选择分类">
            <el-option label="水果" value="水果"></el-option>
            <el-option label="蔬菜" value="蔬菜"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="formInline.user" placeholder="条形码,商品名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 95%">
        <el-table-column label="商品条形码" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.barCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属分类" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="售价(元)" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.salePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="促销价(元)" width="100">
          <template slot-scope="scope">
            <span
              style="margin-left: 10px"
            >{{ (scope.row.promotion == '0' ? scope.row.salePrice * 0.8 : 0).toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="市场价(元)" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.marketPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="库存" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.stockCount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售总额(元)" width="100">
          <template slot-scope>
            <span style="margin-left: 10px">{{ }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="change(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-table :data="tableData" style="width: 100%">
        <el-table-column label="商品条形码" prop="barCode"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="class"></el-table-column>
        <el-table-column label="售价(元)" prop="sell"></el-table-column>
        <el-table-column label="促销价(元)" prop="promotion"></el-table-column>
        <el-table-column label="市场价(元)" prop="market"></el-table-column>
        <el-table-column label="库存" prop="inventory"></el-table-column>
        <el-table-column label="销售总额(元)" prop="totalSales"></el-table-column>
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
        <el-table-column align="right">
          <div slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
          </div>
        </el-table-column>
      </el-table>-->
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="row"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 修改对话框 -->
      <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="条形码" :label-width="formLabelWidth">
            <el-input v-model="form.barCode" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="售价" :label-width="formLabelWidth">
            <el-input v-model="form.salePrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="市场价" :label-width="formLabelWidth">
            <el-input v-model="form.marketPrice" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeman">修 改</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { mangement, changemangement } from "@/apis/apis";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        // {
        //     category: "", //分类
        //     barCode: "", //条形码
        //     name: "", //商品名称
        //     salePrice: 0, //售价
        //     marketPrice: 0, //市场价
        //     promotion: 0 ,//促销价
        //     stockCount: 0, //入库数量
        //     allstock: 0, //销售总量
        //   }
      ],
      search: "",
      row: 4,
      total: 0,
      curpage: 1,
      //弹出对话框表单
      form: {
        name: "",
        barCode: "",
        salePrice: "",
        marketPrice: ""
      },
      dialogFormVisible: false //对话框
    };
  },
  created() {
    // let {barCode, name,category, salePrice, promotion, marketPrice, stockCount,allstock} = this.tableData
    // this.ajaxPageList(this.page)
    this.ajaxPageList(this.curpage);
  },
  methods: {
    //提交修改数据
    changeman() {
      changemangement(this.form).then(res => {
        if (res.data == "ok") {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "修改失败",
            type: "warning"
          });
        }
      });
      this.dialogFormVisible = false

      //调用刷新数据
      this.ajaxPageList(this.curpage)

    },
    //修改
    change(index, row) {
      console.log(row);
      //弹出修改框
      this.dialogFormVisible = true;
      //赋值给修改框
      for (let key in this.form) {
        this.form[key] = row[key];
      }
    },
    //查询
    onSubmit() {
      console.log("submit!");
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
    },
    //row
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //curpage
    handleCurrentChange(val) {
      this.curpage = val;
      this.ajaxPageList(val);
    },
    ajaxPageList(curpage) {
      mangement(curpage, this.row).then(res => {
        // this.data.promotion = this.salePrice * 0.8
        // this.tableData = res.data;
        this.tableData = res.data.data; //数据
        //最大页数
        this.total = res.data.total;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.block {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>