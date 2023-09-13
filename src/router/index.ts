import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Module from '@/Module.vue'
import SalesRoutes from '@/modules/sales/routes';
import CustomersRoutes from '@/modules/customers/routes'

const routes: RouteRecordRaw[] = [
  {
    path: '/app',
    component: Module,
    children: [
      ...SalesRoutes,
      ...CustomersRoutes,
    ]
  },
  {
    path: '/:pathMatch(.*)*', // como lleva "/" ya no se tiene que validar la ruta vacia "", de lo contratrio si debe e hacer.
    redirect: '/app', // si toda toda la ruta no existe entonces redirije (/aaa/bbb/ccc/.../)
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
})

export default router