import { RouteRecordRaw } from 'vue-router'
import Module from './Module.vue'
import { Create, Index } from './pages'

const routes: RouteRecordRaw[] = [
  {
    path: 'beneficiaries',
    component: Module,
    children: [
      {
        path: '',
        name: 'beneficiaries.index',
        component: Index,
      },
      
      {
        path: 'create',
        name: 'beneficiaries.create',
        component: Create,
      },
    ],
  },
]

export default routes