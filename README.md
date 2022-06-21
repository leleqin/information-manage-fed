# information-manage-fed

## Project setup

```text
npm install
```

### Compiles and hot-reloads for development

```text
npm run serve
```

### Compiles and minifies for production

```text
npm run build

cd dist

serve
```

### Lints and fixes files

```text
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 技术细节

1. Element UI 使用
2. 全局文件引用
3. 路由懒加载
4. axios 请求封装

    - 返回的是一个 Promise 对象

5. Postman 接口测试
6. 重复请求避免
7. 接口请求封装 services
    - 方便后期修改接口，增强可维护性
8. 使用 qs 库，用于 JSON 和 对象之间转换
    - `npm i qs`
9. 使用 Vuex ，在组件外部管理状态 (用于多个无关联的组件使用同一数据的情况)
    - [文档地址](https://v3.vuex.vuejs.org/zh/)
    - 存储登录的 token
    - store 文件放置
    - 页面属性，数据就没了
10. access_token 过期处理
    - 使用 axios 的 response 拦截，判断 state code
    - 401 时向服务器请求刷新token
    - 再次执行所需请求
    - 因为请求是异步的，当页面有多个请求时，会造成 Token 重复刷新的问题
    - 要避免 Token 重复刷新
11. 导航收缩功能动画卡顿问题
    - 需要给 `el-menu` 设置过度动画

    ```css
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
    height: 100%;
    border-right: 0;
    }
    ```

    - 也需要给 `el-aside` 设置 `width="initial"` 设置 CSS 属性为它的默认值
12. 重置
    - Element UI 提供了 reset 方法
    - 给 form 表单设置 refs
    - 使用 `this.$refs.searchForm.resetFields();`
    - **要给重置的项加 prop**
13. 时间格式化
    - 通过过滤器，获取 date 使用 Date 对象，对时间进行格式化处理
    - 获取年 `date.getFullYear()`
    - 获取月 `date.getMonth() + 1`
    - 获取日 `date.getDate()`
14. 解构取别名

    ```JavaScript
    const { data: dataName} = await getXXX();
    ```

15. router.push 注意 query 和 params 的区别
16. 使用 `v-if` 可以在条件不满足的时候，销毁组件。用于 dialog
17. 有些 Element UI 的组件样式需要用到外部的 class ，但是 Style 声明了 scoped 若想解决，可以在需要使用外部 class 的样式前，加 `::v-deep` 深度作用选择器
18. 上传图片，使用 FormData 对象
19. 上传图片百分比获取 ajax 的 `onUploadProgress()` 使用 event 的 total 和 loaded 的数,计算出进度
20. 富文本编辑器,使用 [wangedit](https://github.com/wangeditor-team/wangEditor)

    - 富文本内容传递的数据必须是有标签的形式
    - 设置 editorConfig 需要在 MENU_CONF 中设置

21. 使用 `Promise.all()` 方法，进行批量的异步操作处理。可以将多个异步请求，变成同时的异步发送，而不是一个一个的异步发送。

    - `Promise.all()` 接收的参数是一个 Promise 数组

22. 阿里云视频点播功能
    1618139964448548

### 登录功能

1. 登录状态存储，使用 vuex 存储登录的状态
    - 组件中直接使用 `this.$store.commit()` 的方式
    - js 文件中需要引用
    - 为避免刷新需要再次登录，将信息存在 localStorage 中
    - 将信息初始化给 store 中的 user
2. 路由中判断是当前是否为登录状态，才能进入管理页面
    - 使用 router 的 `meta: { requiresAuth: true }` 判断是否需要经过身份验证后才能访问
    - 通过路由守护判断是否有权限访问
3. 登录成功跳转到被路由守卫拦截下来的之前的页面
    - 在路由守卫中存储初始访问的 `to.fullPath`
    - 登录成功通过 `this.$route.query.redirect` 获取路径直接跳转（注意是 route）
4. 获取用户信息
    - 发送的 get 请求，需要携带 access_token
    - 在 axios 的请求拦截中设置，减少多次书写
    - Postman 中可以设置集合的请求头 `Authorization` 值为登录的 access_token

### 登出功能

1. 清除 store 中的 user 信息
    - 点击登出的按键事件需要使用 native `@click.native="userLogout"`

## 登录账号密码

账号： 18201288771
密码： 111111
