import Image from 'next/image';
import React from 'react';
import { toast } from 'sonner';

import { TOAST_COLOR } from '@/shared/enums/common';

interface ToastProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  type: string;
}

const CustomToast = ({
  title,
  message,
  icon,
  type,
  id,
}: ToastProps & {
  id: string | number;
}) => {
  const backGroundColor =
    TOAST_COLOR[type.toUpperCase() as keyof typeof TOAST_COLOR];
  return (
    <div
      className="flex items-start gap-4 rounded-md px-4 py-3.5 shadow-lg"
      style={{ backgroundColor: backGroundColor }}
    >
      {/* Icon Position */}
      {icon && <>{icon}</>}
      <div className="flex flex-col gap-1 text-[#00141A]">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-lg font-normal tracking-[0.18px]">{message}</p>
      </div>
      <button className="size-5" onClick={() => toast.dismiss(id)}>
        <Image
          src="/icons/toast/close.svg"
          width={20}
          height={20}
          alt="Close Icon"
        />
      </button>
    </div>
  );
};

export default function showToast({ title, message, icon, type }: ToastProps) {
  toast.custom((id) => (
    <CustomToast
      title={title}
      message={message}
      icon={icon}
      type={type}
      id={id}
    />
  ));
}
