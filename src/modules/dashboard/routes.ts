import Index from './pages/Index.vue'
import Module from './Module.vue'

const routes = [
  {
    path: 'dashboard',
    component: Module,
    children: [
      {
        path: '',
        name: 'dashboard.index',
        component: Index,
      },
    ],
  },
]

export default routes