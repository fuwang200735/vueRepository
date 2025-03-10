<template>
  <div>
    <!--引入导航菜单-->
    <el-menu
        style="width: 200px;"
        default-active="2"
        class="el-menu-vertical-demo"
    >
      <el-menu-item index="1"  disabled>
        <el-icon><icon-menu /></el-icon>
        <span @click="yonghu">用户管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span  @click="yichangwu">异常物检测</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><document /></el-icon>
        <span>人脸打卡</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><document /></el-icon>
        <span>语音课堂</span>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon><setting /></el-icon>
        <span @click="pilao">疲劳检测</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import request from "@/utils/request";

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    yichangwu(){
      this.$router.push('/yichangwu'); // 跳转到/new-page路由
    },
    yonghu(){
      this.$router.push('/'); // 跳转到/new-page路由
    },
    pilao(){
      request.get("http://127.0.0.1:5000/pilao").then(res => {
        this.$router.push('/'); // 跳转到/new-page路由
      })
    }
  }
}
</script>