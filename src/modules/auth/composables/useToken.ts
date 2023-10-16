import { $storage } from "@/services"

export const useToken = () => {
   const getToken = () => $storage.get($storage.TOKEN)
   const getRememberToken = () => $storage.get($storage.REMEMBER_TOKEN)

   const setTokens = (token: string, rememberToken: string | null) => {
      $storage.set($storage.TOKEN, token)
      $storage.set($storage.REMEMBER_TOKEN, rememberToken ?? '')
   }
   
   const removeTokens = () => {
      $storage.remove($storage.TOKEN)
      $storage.remove($storage.REMEMBER_TOKEN)
   }
   return {
      getToken,
      getRememberToken,
      setTokens,
      removeTokens,
   }
}