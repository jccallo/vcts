import { useToast as VueToastification } from 'vue-toastification';

export const useToast = () => {
  const toast = VueToastification();

  const success = (message: string): void => {
    toast.success(message);
  }

  const info = (message: string): void => {
    toast.info(message);
  }

  const warning = (message: string): void => {
    toast.warning(message);
  }

  const error = (message: string): void => {
    toast.error(message);
  }

  return {
    $success: success,
    $info: info,
    $warning: warning,
    $error: error,
    $toastError: error,
    $errorMessage: error,
  }
}