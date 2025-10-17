import { toast } from "react-hot-toast";
import { CheckCircle, Info, AlertTriangle, AlertCircle } from "lucide-react";
import React from "react";

type ToastType = "info" | "error" | "warning" | "success";

const toastStyles: Record<
  ToastType,
  { icon: React.ReactNode; color: string }
> = {
  info: { icon: <Info className="text-blue-500" />, color: "#3B82F6" },
  error: { icon: <AlertCircle className="text-red-500" />, color: "#EF4444" },
  warning: { icon: <AlertTriangle className="text-yellow-500" />, color: "#F59E0B" },
  success: { icon: <CheckCircle className="text-green-500" />, color: "#22C55E" },
};

export function showToast(type: ToastType, message : string) {
  const { icon, color } = toastStyles[type];

  toast.custom(
    (t) => (
      <div
        className={`relative flex items-center gap-3 bg-white rounded-lg shadow-lg px-4 py-3 border-l-4 transition-all  ${
          t.visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ borderColor: color }}
      >
        {icon}
        <span className="text-gray-800 font-medium">{message}</span>
        <button
        onClick={(e) => {
          e.preventDefault();
        e.stopPropagation();
        toast.dismiss(t.id);
        }}
        className="ml-auto text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <div
          className="absolute bottom-0 left-0 h-1 rounded-b-lg"
          style={{
            backgroundColor: color,
            width: "100%",
            animation: "shrink 3s linear forwards",
          }}
        />
      </div>
    ),
    { duration: 3000 }
  );
}
