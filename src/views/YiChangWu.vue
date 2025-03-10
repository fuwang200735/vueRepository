<template>
  <div>
    <!--增加按钮和搜索框-->
    <div style="margin: 10px 5px">
      <el-button type="primary" @click="shexiang">异常物检测</el-button>
      <el-button>其它</el-button>
    </div>
    <!--margin: 顶部距离 左侧距离-->
    <!--margin: 顶部距离 左侧距离-->
    <div style="margin: 10px 5px">
      <el-input v-model="search" style="width: 20%" placeholder="请输入搜索内容"/>
      <el-button style="margin: 10px" type="primary">检索</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 1200px">
      <el-table-column sortable prop="id" label="异常物编号" v-model="tableData.id"/>
      <el-table-column prop="filePath" label="异常物图片">
        <template v-slot="scope">
          <img :src="scope.row.filePath" alt="示例图片" style="width: 100px; height: 100px;">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="异常物名称" v-model="tableData.name"/>
      <el-table-column fixed="right" label="操作" width="140">
        <!--说明
        1.这里通过 handleEdit(scope.row)
        2.可以将当前行数据传递给 handleEdit
        -->
        <template #default="scope">
          <el-button size="small" type="primary">下载</el-button>
          <!--说明
          1.如果你点击的是确定, 就会触发handleDel
          2.如果你点击的是取消, 就不会触发handleDel
          -->
          <el-popconfirm title="确定要删除吗?">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import request from "@/utils/request";

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      search: '',
      dialogVisible: false,
      form: {},//定义一个空表单
      tableData: []
    }
  },
  methods: {
    list() {
      request.get("/api/yichangwu").then(res => {
        console.log("res.data--", res.data);
        //解读: 为什么是res.data.extend.furns, 可以根据console输出的数据结构来查看
        this.tableData = res.data;
      })
    },
    shexiang(){
      request.get("http://127.0.0.1:5000/shexiang").then(res => {
        this.list();//调用list方法
      })
    }
  },
  created() {//生命周期函数
    this.list();//调用list方法
  }
}
</script>