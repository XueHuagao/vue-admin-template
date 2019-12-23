import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/alarm',
    component: Layout,
    redirect: '/alarm/notification',
    name: 'alarm',
    meta: { title: '警报', icon: 'example' },
    children: [
      {
        path: 'notification',
        name: 'notification',
        component: () => import('@/views/alarmconfig/index'),
        meta: { title: '提醒', icon: 'table' }
      },
      {
        path: 'configuration',
        name: 'configuration',
        component: () => import('@/views/alarmnotice/index'),
        meta: { title: '配置', icon: 'tree' }
      },
      {
        path: 'modbus',
        name: 'Modbus',
        component: () => import('@/views/modbus/index'),
        meta: { title: 'ModBus', icon: 'tree' }
      }
    ]
  },

  {
    path: '/devices',
    component: Layout,
    redirect: '/devices/gateway',
    name: 'Example',
    meta: { title: '设备', icon: 'example' },
    children: [
      {
        path: 'gateway',
        name: 'Gateway',
        component: () => import('@/views/gateway/index'),
        meta: { title: '网关', icon: 'table' }
      },
      {
        path: 'complex',
        name: 'complexGateway',
        component: () => import('@/views/gateway/complex'),
        meta: { title: '网关complex', icon: 'table' }
      },
      {
        path: 'controller',
        name: 'Controller',
        component: () => import('@/views/controller/index'),
        meta: { title: '控制器', icon: 'tree' }
      },
      {
        path: 'example',
        name: 'exampleController',
        component: () => import('@/views/controller/example'),
        meta: { title: '控制器example', icon: 'tree' }
      },
      {
        path: 'modbus',
        name: 'Modbus',
        component: () => import('@/views/modbus/index'),
        meta: { title: 'ModBus', icon: 'tree' }
      },
      {
        path:'gatewaydetail/:id(\\d+)',
        name:'gatewaydetail',
        component:()=>import('@/views/gateway/gatewaydetail'),
        meta:{title:'detail',icon:'table'},
        hidden:true
      },
      {
        path:'controllerdetail/:id(\\d+)',
        name:'controllerdetail',
        component:()=>import('@/views/controller/controllerdetail'),
        meta:{title:'detail',icon:'table'},
        hidden:true
      },
      {
        // path:'gatewaydetailfor',
        // name:'gatewaydetailfor',
        // component:()=>import('@/views/gateway/gatewaydetails/detail'),
        // component:()=>import('@/views/gateway/gatewaydetail'),
        // meta:{title:'detail布局'},
        
          
            path:'alarmconfig',
            name:'alarmconfig',
            component:()=>import('@/views/alarmconfig'),
            meta:{title:'config'}
          
        
      }
    ]
  },

  {
    path: '/tools',
    component: Layout,
    redirect: '/tools/map',
    name: 'Example',
    meta: { title: '工具', icon: 'example' },
    children: [
      {
        path: 'gateway',
        name: 'Gateway',
        component: () => import('@/views/map/index'),
        meta: { title: '地图', icon: 'table' }
      },
      {
        path: 'controller',
        name: 'Controller',
        component: () => import('@/views/statistic/index'),
        meta: { title: '统计', icon: 'tree' }
      },
      {
        path: 'modbus',
        name: 'Modbus',
        component: () => import('@/views/search/index'),
        meta: { title: '查询', icon: 'tree' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Tree', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
