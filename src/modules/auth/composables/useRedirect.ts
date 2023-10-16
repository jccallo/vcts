import router from "@/router"

export const useRedirect = () => {
   const redirectTo = (routeName: string) => {
      router.push({ name: routeName })
   }

   const replaceWith = (routeName: string) => {
      router.replace({ name: routeName })
   }

   return {
      redirectTo,
      replaceWith,
   }
}