import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function toastify(message, type) {
  switch(type) {
    case 'error':
        toast.error(message);
        break;
    default:
        toast.success(message);
        break;
  }
}
