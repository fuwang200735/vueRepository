<template>
  <div>
    <!--增加按钮和搜索框-->
    <div style="margin: 10px 5px">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button>其它</el-button>
    </div>
    <!--margin: 顶部距离 左侧距离-->
    <!--margin: 顶部距离 左侧距离-->
    <div style="margin: 10px 5px">
      <el-input v-model="search" style="width: 20%" placeholder="请输入搜索内容"/>
      <el-button style="margin: 10px" type="primary" @click="searchUser">检索</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 1200px">
      <el-table-column sortable prop="id" label="用户id" v-model="tableData.id"/>
      <el-table-column prop="username" label="姓名" v-model="tableData.username"/>
      <el-table-column prop="password" label="密码" v-model="tableData.password"/>
      <el-table-column prop="pictureUrl" label="头像">
        <template v-slot="scope">
          <img :src="scope.row.pictureUrl" alt="示例图片" style="width: 100px; height: 100px;">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <!--说明
        1.这里通过 handleEdit(scope.row)
        2.可以将当前行数据传递给 handleEdit
        -->
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <!--说明
          1.如果你点击的是确定, 就会触发handleDel
          2.如果你点击的是取消, 就不会触发handleDel
          -->
          <el-popconfirm title="确定要删除吗?" @confirm="handleDel(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--说明家居的弹窗
   说明:
   1.el-dialog v-model="dialogFormVisible" 表示对话框, 和 dialogFormVisible 变量双向绑定, 控制是否显示对话框
   2.el-form :model="form" 表示 表单数据 和 form数据变量 双向绑定
   3.el-input v-model="form.name" 表示表单的input控件, 名字为name, 需要和后台JavaBean属性一致
   4.在前端中, 对象的属性是可以动态生成的. 这个知识点, 我们在讲解前端技术栈讲过.
   -->
    <el-dialog v-model="dialogVisible" title="提示" width="500">
      <el-form :model="form" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="form.username" style="width: 80%"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" style="width: 80%"/>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="form.pictureUrl" style="width: 80%"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
// @ is an alias to /src
// 导出组件
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
    add() {
      //显示对话框
      this.dialogVisible = true;
      //情况添加表单数据
      this.form = {}
    },
    save() {//将填写的表单数据,发送给后端
      //修改和添加时走的同一个方法
      if (this.form.id) {//表示修改
        request.put("/api/update", this.form).then(res => {
          console.log("res=", res);
          if (res.status === 200) {//修改成功
            //提示一个成功的消息框
            this.$message({
              message: "修改成功!",
              type: "success",
            });
          } else {
            this.$message({
              message: "修改失败!",
              type: "error",
            });
          }
          //关闭对话框
          this.dialogVisible = false;
          //调用list方法, 刷新数据
          this.list();
        })
      } else {//表示添加
        //解读
        //1.url: http://localhost:8080/ssm/save
        //2.this.form: 携带的数据
        request.post("/api/save", this.form).then(res => {
          // console.log("res=", res);
          this.dialogVisible = false;
          //调用list方法, 刷新数据
          this.list();
        });
      }
      //这里有一个注意事项...
    },
    //编写list方法, 请求返回家居信息
    //list方法应该是自动调用
    list() {
      request.get("/api/selectAll").then(res => {
        console.log("res.data--", res.data);
        //解读: 为什么是res.data.extend.furns, 可以根据console输出的数据结构来查看
        this.tableData = res.data;
      })
    },
    searchUser(){
      //请求分页的接口-带检索条件
      request.get("/api/findBySearch", {
        params: {//指定请求携带的参数
          search: this.search
        }
      }).then(res => {//处理返回的分页信息
        this.tableData = res.data;
      })
    },
    handleDel(id) {
      console.log("id=", id);
      request.delete('/api/delete/' + id).then(res => {
        console.log("res=", res);
        if (res.status === 200) {//删除成功
          this.$message({
            message: "删除成功！",
            type: "success",
          });
        } else {//删除失败
          this.$message({
            message:"删除失败！" ,
            type: "error",
          });
        }
        //调用list方法, 刷新数据
        this.list();
      })},
    handleEdit(row) {
      //console.log("row--", row);
      //将当前的家居信息绑定到弹出对话框的表单上
      //1. 方式1: 可以通过row.id 到后端-DB去获取对应的家居信息, 返回后将其绑定到this.form[小伙伴自己思考解决]
      //2. 方式2: 把获取的row的数据通过处理, 绑定到this.form 进行显示
      //3. JSON.stringify(row): 将row 转成json字符串
      //4. JSON.parse(JSON.stringify(row)) 将json字符串 转成json对象
      this.form = JSON.parse(JSON.stringify(row));
      //显示对话框
      this.dialogVisible = true;
    }
  },
  created() {//生命周期函数
    this.list();//调用list方法
  }
}

</script>
