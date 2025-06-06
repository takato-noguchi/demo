import React from 'react'
import { Applicants } from '@/components/applicants'

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-7xl">
        <Applicants />
      </div>
    </div>
  )
}
