# 1、assets 
静态资源

| 文件         | 说明 |
|------------|----|
| images     | 图片 |

# 2、common
公共组件以及方法

| 文件         | 说明                 |
|------------|--------------------|
| aside      | 侧边栏(二级，设置)         |
| breadcrumb | 面包屑                |
| btn        | 按钮                 |
| classes    | 处理类名               |
| language   | 语言                 |
| layout     | 布局                 |
| lazy       | 懒加载                |
| list       | 列表组件(动态，待办，图标，空列表) |
| messages   | 消息                 |
| page       | 分页                 |
| profile    | 头像                 |
| search     | 搜索(文本，下拉，时间)       |
| tabs       | 标签页                |

## 2.1、layout
| 文件            | 说明                       |
|---------------|--------------------------|
| Layout        | 单页面的布局，集成导航、帮助链接和用户认证等功能 |
| Portal        | 主要布局框架，处理整体页面结构          |
| PortalFeature | 企业特性                     |
| SettingAside  | 设置页面的侧边栏导航               |

# 3、home
首页

# 4、login
| 文件                 | 说明          |
|--------------------|-------------|
| ExcludeProductUser | 没有应用访问权限    |
| Login              | 登录          |
| LoginRpw           | 首次登录修改密码    |
| Logout             | 退出          |
| NotFound           | 404         |
| SysException       | 系统异常        |

# 5、setting
系统设置模块

| 文件           | 说明   |
|--------------|------|
| base         | 基础数据 |
| home         | 设置首页 |
| integration  | 系统集成 |
| licence      | 应用   |
| message      | 消息   |
| privilege    | 权限   |
| resources    | 资源监控 |
| security     | 安全   |
| user         | 用户   |

## 4.1、base
| 文件          | 说明    |
|-------------|-------|
| log         | 日志配置  |
| message     | 消息配置  |
| privilege   | 权限配置  |
| user        | 用户配置  |


# 6、配置文件
| 文件            | 说明           |
|---------------|--------------|
| webpack.*.js  | webpack配置    |
| package.json  | 项目依赖配置       |
| .env.*        | 环境变量配置       |
