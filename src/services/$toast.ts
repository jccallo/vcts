import { useToast } from 'vue-toastification'

class ToastService {
   private toast: any

   constructor() {
      this.toast = useToast()
   }

   success(message: string): void {
      this.toast.success(message)
   }

   info(message: string): void {
      this.toast.info(message)
   }

   warning(message: string): void {
      this.toast.warning(message)
   }

   error(message: string): void {
      this.toast.error(message)
   }
}

export const $toast = new ToastService()
