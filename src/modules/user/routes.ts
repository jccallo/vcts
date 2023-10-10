import { RouteRecordRaw } from 'vue-router'
import Module from './Module.vue'
import Index from './pages/Index.vue'
import Create from './pages/Create.vue'

const routes: RouteRecordRaw[] = [
  {
    path: 'users',
    component: Module,
    children: [
      {
        path: '',
        name: 'users.index',
        component: Index,
      },

      {
        path: 'create',
        name: 'users.create',
        component: Create,
      },
    ],
  },
]

export default routes
