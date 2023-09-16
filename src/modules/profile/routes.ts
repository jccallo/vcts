import { RouteRecordRaw } from 'vue-router'
import Module from './Module.vue'
import { Create, Index } from './pages'

const routes: RouteRecordRaw[] = [
  {
    path: 'profiles',
    component: Module,
    children: [
      {
        path: '',
        name: 'profiles.index',
        component: Index,
      },
      
      {
        path: 'create',
        name: 'profiles.create',
        component: Create,
      },
    ],
  },
]

export default routes