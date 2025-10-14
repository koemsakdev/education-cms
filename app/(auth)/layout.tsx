import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative flex min-h-svh items-center justify-center'>
        <div className='flex w-full max-w-md flex-col gap-6'>
            <Link 
              href="/"
              prefetch={false}
              className='font-medium flex flex-col items-center self-center gap-4'
            >
              <Image
                src="/edu-cms.svg"
                alt="EDEducation CMS"
                width={200}
                height={200}
              />
            </Link>
            {children}
        </div>
    </div>
  )
}

export default AuthLayout