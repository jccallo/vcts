import Index from './pages/Index.vue'
import Module from './Module.vue'
import { RouteRecordRaw } from 'vue-router'

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
    ],
  },
]

export default routes