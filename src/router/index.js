import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard', icon: 'example' }
    }]
  },

  {
    path: '/users',
    component: Layout,
    name: 'users',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/users/user'),
        meta: { title: '用户', icon: 'usernew' }
      },
      {
        path: 'groups',
        name: 'groups',
        permission: 'resources.add_ip',
        component: () => import('@/views/groups'),
        meta: { title: '用户组', icon: 'usergroup' }
      }
    ]
  },

  {
    path: '/books',
    component: Layout,
    name: '图书管理系统',
    meta: { title: '图书管理系统', icon: 'example' },
    children: [
      {
        path: 'book',
        name: '图书',
        component: () => import('@/views/books/book/index'),
        meta: { title: '图书', icon: 'table' }
      },
      {
        path: 'author',
        name: '作者',
        component: () => import('@/views/books/author/index'),
        meta: { title: '作者', icon: 'tree' }
      },
      {
        path: 'publish',
        name: '出版商',
        component: () => import('@/views/books/publish/index'),
        meta: { title: '出版商', icon: 'table' }
      }
    ]
  },

  {
    path: '/workorder',
    component: Layout,
    name: '工单系统',
    meta: { title: '工单系统', icon: 'example' },
    children: [
      {
        path: 'apply',
        name: '工单申请',
        component: () => import('@/views/workorder/apply/index'),
        meta: { title: '工单申请', icon: 'table' }
      },
      {
        path: 'list',
        name: '申请列表',
        component: () => import('@/views/workorder/list/index'),
        meta: { title: '申请列表', icon: 'tree' }
      },
      {
        path: 'history',
        name: '工单历史',
        component: () => import('@/views/workorder/history/index'),
        meta: { title: '工单历史', icon: 'table' }
      }
    ]
  },

  {
    path: '/tasks',
    component: Layout,
    name: '任务系统',
    meta: { title: '任务系统', icon: 'example' },
    children: [
      {
        path: 'add',
        name: '任务添加',
        component: () => import('@/views/tasks/add/index'),
        meta: { title: '任务添加', icon: 'table' }
      },
      {
        path: 'list',
        name: '任务列表',
        component: () => import('@/views/tasks/list/index'),
        meta: { title: '任务列表', icon: 'tree' }
      }
    ]
  },

  {
    path: '/esmanager',
    component: Layout,
    name: '日志管理系统',
    meta: { title: '日志管理系统', icon: 'example' },
    children: [
      {
        path: 'escluster',
        name: '集群管理',
        component: () => import('@/views/esmanager/escluster/index'),
        meta: { title: '集群管理', icon: 'table' }
      },
      {
        path: 'indexmanage',
        name: '索引管理',
        component: () => import('@/views/esmanager/indexmanage/index'),
        meta: { title: '索引管理', icon: 'file' }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
