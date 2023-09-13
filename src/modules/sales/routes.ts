import { Index, Create } from './pages'
import Module from './Module.vue'

const routes = [
  {
    path: 'sales',
    component: Module,
    children: [
      {
        path: '',
        name: 'sales.index',
        component: Index,
      },
      {
        path: 'create',
        name: 'sales.create',
        component: Create,
      },
    ],
  },
]

export default routes
