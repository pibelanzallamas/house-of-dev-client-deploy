import { Store } from "react-notifications-component";
import "animate.css/animate.min.css";

export function alerts(title, message, type) {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "bottom",
    container: "bottom-right",
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
    },
  });
}
