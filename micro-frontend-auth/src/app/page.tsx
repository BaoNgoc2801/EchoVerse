'use client';

import SignIn from './auth/signin/page';

export default function HomePage() {
  const handleClose = () => {
    console.log("Modal closed"); // Add the close modal logic here
  };

  return <SignIn onClose={handleClose} />;
}
