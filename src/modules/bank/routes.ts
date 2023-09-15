import { RouteRecordRaw } from 'vue-router'
import Module from './Module.vue'
import { Create, Index } from './pages'

const routes: RouteRecordRaw[] = [
  {
    path: 'banks',
    component: Module,
    children: [
      {
        path: '',
        name: 'banks.index',
        component: Index,
      },
      
      {
        path: 'create',
        name: 'banks.create',
        component: Create,
      },
    ],
  },
]

export default routes