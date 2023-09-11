import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Module from '@/Module.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import HelloWorld2 from '@/components/HelloWorld2.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/app',
    component: Module,
    children: [
      {
        path: "",
        name: 'HelloWorld',
        component: HelloWorld,
      },
      {
        path: "hello",
        name: "hello",
        component: HelloWorld2,
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*', // como lleva "/" ya no se tiene que validar la ruta vacia "", de lo contratrio si debe e hacer.
    redirect: '/app', // si toda toda la ruta no existe entonces redirije (/aaa/bbb/ccc/.../)
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
})

export default router