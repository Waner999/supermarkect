<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>库存管理</span>
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="分类">
          <el-input v-model="formInline.user" placeholder="选择分类"></el-input>
        </el-form-item>
        <el-form-item label="关键字">
          <el-select v-model="formInline.region" placeholder="商品名称|条形码">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="商品条形码" prop="barCode"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="进价(元)" prop="stockPrice"></el-table-column>
        <el-table-column label="入库" prop="inventory"></el-table-column>
        <el-table-column label="库存" prop="stockCount"></el-table-column>
        <el-table-column label="已售" prop="stockCount"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          background
          :current-page.sync="curpage"
          :page-size="row"
          layout="prev, pager, next, jumper"
          :total="10"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { stock } from '@/apis/apis'
 export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
      
      ],
      search: "",
      curpage: 1,
      row:8,
      total:0,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    stock(1,2).then( res => {

      //获取数据
      this.tableData = res.data.data
      console.log(res)
    })
  },
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