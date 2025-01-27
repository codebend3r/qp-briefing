import Image from "next/image"

export const Loading = () => (
  <div style={{ textAlign: "center" }}>
    <Image src="/spinner.svg" height={35} width={35} alt="Loading" />
  </div>
)
