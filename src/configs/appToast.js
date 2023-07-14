import { toast } from 'react-toastify'

const toastOptions = {
  position: 'top-right',
  autoClose: 5000,
  theme: 'light'
}

export const showFaliureToast = message => {
  try {
    toast.dismiss()
    const options = toastOptions
    toast.error(message, options)
  } catch (err) {
    console.log('this is  err======', err)
  }
}

export const showSuccessToast = message => {
  try {
    toast.dismiss()
    const options = toastOptions
    toast.success(message ?? 'success', options)
  } catch (err) {
    console.log('this is err on toast-------', err)
  }
}
