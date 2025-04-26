import React from "react"

type Props = {
    children: React.ReactNode;
}

export default function BorderGradient({ children }: Readonly<Props>) {
  return (
    <div className="card-wrapper">
        <div className="card-content flex items-center justify-center">
            {children}
        </div>
    </div>
  )
}