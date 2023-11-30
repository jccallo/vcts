import { RouteRecordRaw } from 'vue-router'
import Module from './Module.vue'
import { Edit, Index, Create, Show, CardCreate } from './pages'

const routes: RouteRecordRaw[] = [
  {
    path: 'customers',
    component: Module,
    children: [
      {
        path: '',
        name: 'customers.index',
        component: Index,
      },
      {
        path: 'create',
        name: 'customers.create',
        component: Create,
      },
      {
        path: ':id/edit',
        name: 'customers.edit',
        component: Edit,
      },
      {
        path: ':id',
        name: 'customers.show',
        component: Show,
      },
      {
        path: ':id/cards/create',
        name: 'customers.cards.create',
        component: CardCreate,
      },
    ],
  },
]

export default routes