### 导入依赖

- ElementUIPlus
- Sass
- Vue-router

### 准备

> 创建项目后会导入默认的样式文件 删除原有的设置 修改为基础样式

```
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}

```

### 首页搭建

> SPA 的页面设计比较简单，在 view 下创建 Layout 文件夹，里面创建 index.vue 文件，Layout 是这个页面的整体结构。
> <img width="743" alt="image" src="https://github.com/user-attachments/assets/846166a4-2aaf-4cc7-964b-8bf977730dd3">

### 配置首页路由

```
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../view/Layout/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
    },
  ]
})

export default router
```

在 App.vue 中配置好 Layout 的路由出口：
<img width="786" alt="image" src="https://github.com/user-attachments/assets/3fb9319c-73d5-4032-a074-3adfdbe61870">

### 开发首页

使用官网布局开发
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/13b0b811-8ced-4d32-9440-de85689637c1">
<img width="1296" alt="image" src="https://github.com/user-attachments/assets/c9e05ce2-6cb7-47e7-b128-d3768d2d5144">

#### 头部

```
<el-header class="header">
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
```

```
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
```

<img width="1436" alt="image" src="https://github.com/user-attachments/assets/0388a6f0-d493-4af4-b79d-08c862b02b14">

### 开发菜单

```
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
```

<img width="625" alt="image" src="https://github.com/user-attachments/assets/ed08f6f4-3a3a-4630-aa45-dffa9dd40581">
图标失效 引入图标
```
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
```
<img width="648" alt="image" src="https://github.com/user-attachments/assets/7f4f76c1-13c7-414a-a6d3-6ca0f6d161e8">

编写样式

```
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
```

菜单收缩

```
 <el-header class="header">
        <!-- 菜单隐藏 -->
        <div @click="handleIsFold">
          <el-icon v-if="isFold" size="30px"><Fold /></el-icon>
          <el-icon v-else size="30px"><Expand /></el-icon>
        </div>
        <!--  -->
```

使用一个变量来控制状态 当触发点击条件时

```
const isFold = ref(false);
const handleIsFold = () => {
  isFold.value = !isFold.value;
};
```

#### 右边内容

根据路由动态跳转页面

```
 <el-main>
          <!-- 二级路由出口 -->
          <router-view />
        </el-main>
```

编写不同路由的页面

在路由中配置路由对应要展示的页面
创建了三个空页面

 <img width="321" alt="image" src="https://github.com/user-attachments/assets/d3dd814e-5612-41e1-abff-fe6350641522">

展示默认文字

```
<template>
  <div>
    <div>关于</div>
  </div>
</template>
<script setup></script>
<style scoped></style>

```

在路由配置

```
routes: [
    {
      path: '/',
      name: 'layout',
      component:  () => import('../view/Layout/index.vue'),
      children: [
        {
          path: '',
          name: '首页',
          component: () => import('../view/Home/index.vue')
        },
        {
          path: '/admin',
          name: '管理',
          component: () => import('../view/Admin/index.vue')
        },
        {
          path: '/about',
          name: '关于',
          component: () => import('../view/About/index.vue')
        }
      ]
    },
```

#### 面包屑开发

```
<div class="breadcrumb">
            <el-breadcrumb separator=">">
              <el-breadcrumb-item v-for="item in breadcrumbData" :key="item">
                {{ item }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
```

```
//路由切换
const route = useRoute()
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  if (route.path !== '/login') {
    breadcrumbData.value = []
    breadcrumbData.value.push('首页')
    if (route.path === '/') {
      return
    }
    for (let i = 1; i < route.matched.length; i++) {
      //不需要再次添加“首页”。
      let matchName = route.matched[i].name
      breadcrumbData.value.push(matchName)
    }
  }
}
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true,
    deep: true
  }
)
```

<img width="1440" alt="image" src="https://github.com/user-attachments/assets/e9bfd47c-ea11-43d7-aecf-daa23edade59">
