import * as React from "react"

const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    style={{
      cursor: "pointer",
    }}
    {...props}
  >
    <path
      fill="#fff"
      d="M13.688 13.938a6.197 6.197 0 0 1 6.187 6.187c0 .633-.527 1.125-1.125 1.125H5.25a1.11 1.11 0 0 1-1.125-1.125 6.174 6.174 0 0 1 6.188-6.188h3.374Zm-7.876 5.624h12.34c-.28-2.214-2.18-3.937-4.465-3.937h-3.374a4.524 4.524 0 0 0-4.5 3.938ZM12 12.25a4.486 4.486 0 0 1-4.5-4.5c0-2.46 2.004-4.5 4.5-4.5 2.46 0 4.5 2.04 4.5 4.5 0 2.496-2.04 4.5-4.5 4.5Zm0-7.313A2.798 2.798 0 0 0 9.187 7.75 2.777 2.777 0 0 0 12 10.563a2.798 2.798 0 0 0 2.813-2.813A2.82 2.82 0 0 0 12 4.937Z"
    />
  </svg>
)

export { SvgComponent as Account}
export { SvgComponent as AccountIcon}