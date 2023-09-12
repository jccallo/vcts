import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Module from '@/Module.vue'
import SaleRoutes from '@/modules/sale/routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/app',
    component: Module,
    children: [
      ...SaleRoutes,
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