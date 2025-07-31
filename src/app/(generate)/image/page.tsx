import LoginButton from '@/components/login';
import { auth } from '@/lib/auth';
import React from 'react'

const ImageS = async () => {
  const session = await auth();
    if (!session?.user) {
      return (
        <div className="h-full flex justify-center items-center flex-col gap-4">
          <div className="">Please log in to view your Images.</div>
          <div>
            <LoginButton />
          </div>
        </div>
      );
    }
  return (
    <div>ImageS</div>
  )
}

export default ImageS