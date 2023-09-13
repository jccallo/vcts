import { Index } from './pages'
import Module from './Module.vue'

const routes = [
  {
    path: 'customers',
    component: Module,
    children: [
      {
        path: '',
        name: 'customers.index',
        component: Index,
      },
    ],
  },
]

export default routes