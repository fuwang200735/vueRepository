<template>
  <div>
    <!--引入Header组件/界面 头部-->
    <Header/>
    <!--主体-->
    <div style="display: flex">
      <!--侧边栏-->
      <Aside/>
      <!--内容区域 这个部分通过路由展示, 我们就路由到HomeView.vue
      http://localhost:10000/ => HomeView.vue
      http://localhost:10000/about => AboutView.vue
      -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";

export default {
  name: "Layout",
  components: {
    Aside,
    Header
  }
}
</script>
