import React from 'react'

export default function ProducersLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="container flex flex-col gap-8 my-16 pb-4">
        <div className="">Our Affiliate Producers</div>
        <div className="min-h-screen w-full">{children}</div>
      </div>
    </React.Fragment>
  )
}
