import router from '@/router'

class RedirectService {
   public To(routeName: string) {
      window.location.replace(routeName)
   }

   public goTo(routeName: string) {
      router.push({ name: routeName })
   }

   public replaceWith(routeName: string) {
      router.replace({ name: routeName })
      console.log('routeName', routeName)
   }
}

export const $redirect = new RedirectService()
