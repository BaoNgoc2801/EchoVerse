import Image from 'next/image';

export const SuccessIcon = () => {
  return (
    <Image
      src="/icons/toast/toast-success.svg"
      width={24}
      height={24}
      alt={'Toast Success Icon'}
    />
  );
};
