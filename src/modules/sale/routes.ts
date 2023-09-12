import { Index, Create } from './pages'
import Module from './Module.vue'

const routes = [
  {
    path: 'sales',
    component: Module,
    children: [
      {
        path: '',
        name: 'sale.index',
        component: Index,
      },
      {
        path: 'create',
        name: 'sale.create',
        component: Create,
      },
    ],
  },
]

export default routes
