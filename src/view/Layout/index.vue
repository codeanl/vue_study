<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <!-- 菜单隐藏 -->
        <div @click="handleIsFold">
          <el-icon v-if="isFold" size="30px"><Fold /></el-icon>
          <el-icon v-else size="30px"><Expand /></el-icon>
        </div>
        <!--  -->
        <span>XXX管理系统</span>
        <!-- 头像 -->
        <div class="topAvatar">
          <el-avatar
            class="avatar"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <el-dropdown>
            <span class="el-dropdown-link">
              admin
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>注销</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <el-menu
            default-active="/"
            class="el-menu-vertical-demo"
            :collapse="isFold"
            background-color="#324157"
            text-color="#fff"
            :router="true"
          >
            <el-menu-item index="/">
              <el-icon><House /></el-icon>
              <template #title>首页</template>
            </el-menu-item>
            <el-menu-item index="/admin">
              <el-icon><User /></el-icon>
              <template #title>管理</template>
            </el-menu-item>
            <el-menu-item index="/about">
              <el-icon><UserFilled /></el-icon>
              <template #title>关于</template>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main class="main">
          <div class="breadcrumb">
            <el-breadcrumb separator=">">
              <el-breadcrumb-item v-for="item in breadcrumbData" :key="item">
                {{ item }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

//控制菜单折叠
const isFold = ref(false);
const handleIsFold = () => {
  isFold.value = !isFold.value;
};

//路由切换
const route = useRoute();
const breadcrumbData = ref([]);
const getBreadcrumbData = () => {
  breadcrumbData.value = [];
  breadcrumbData.value.push("首页");
  if (route.path === "/") {
    return;
  }
  for (let i = 1; i < route.matched.length; i++) {
    //不需要再次添加“首页”。 当前路由匹配的记录数组
    let matchName = route.matched[i].name;
    breadcrumbData.value.push(matchName);
  }
};
watch(
  route,
  () => {
    getBreadcrumbData();
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss">
.header {
  padding: 0; //内容与其边框之间的距离
  background-color: rgb(36, 47, 66); //背景
  color: white; //字体颜色
  font-size: larger; //字体大小
  line-height: 60px; //行高
  > div {
    display: flex; //弹性布局
    align-items: center; // 垂直居中
    float: left; // 左浮动
    padding: 0 15px; //内边距
    height: 60px; //高度
  }
  .topAvatar {
    float: right; // 右浮动
    margin-right: 40px; // 右边距
    div {
      display: inline-block; // 行内块
    }
    .el-dropdown-link {
      color: #fff; // 字体颜色
    }
    .el-avatar {
      margin: 0 20px; //外边距
    }
  }
}

.aside {
  height: calc(100vh - 60px);
  width: auto;
}
.el-menu-vertical-demo {
  min-height: 100%;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 245px;
}
.el-menu--collapse {
  width: calc(
    var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2
  );
}

.main {
  height: 92.3vh;
  margin: 0;
  padding: 0;
  background-color: rgb(240, 240, 240);
  .breadcrumb {
    height: 25px;
    line-height: 20px;
    background-color: #fff;
    .el-breadcrumb {
      line-height: 25px;
      margin-left: 10px;
    }
  }
}
</style>
