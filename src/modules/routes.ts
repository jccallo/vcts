import { RouteRecordRaw } from 'vue-router'
import { $constant } from '@/services'
import Module from '@/modules/Module.vue'

// importo con una nombre personalizado cambiado pára evitar conflictos
import AuthRoutes from './auth/routes'
import BeneficiaryRoutes from './beneficiary/routes'
import CustomerRoutes from './customer/routes'
import DashboardRoutes from './dashboard/routes'
import SaleRoutes from './sale/routes'
import UserRoutes from './user/routes'

const routes: RouteRecordRaw[] = [
   {
      path: '/app',
      name: 'app',
      component: Module,
      redirect: { name: $constant.DASHBOARD_ROUTE_NAME }, // ya que le estoy poniendo nombre a la ruta
      meta: { requiresAuth: true },
      children: [...DashboardRoutes, ...SaleRoutes, ...UserRoutes, ...CustomerRoutes, ...BeneficiaryRoutes],
   },
   ...AuthRoutes,
   {
      path: '/:pathMatch(.*)*',
      redirect: '/app',
   },
]

export default routes
