"use client"

import { CloseIcon } from "@/components/icons/icons24";

export default function NotificationDismissButton() {
  const dismissNotification = () => {
    const notification = document.getElementById("main-notification");
    if (notification) {
      notification.classList.add("hidden");
    }
  };

  return (
    <button
      className="text-lg text-blue-700 hover:text-blue-900 rounded-full"
      onClick={dismissNotification}
    >
      <CloseIcon />
    </button>
  );
}
