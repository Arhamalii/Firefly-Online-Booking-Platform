import { AccountIcon } from "@/icons/account";
import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-primary">
      <div className="max-w-7xl flex justify-between items-center px-6 mx-auto w-full bg-primary py-7">
        <Image
          src="/header-firefly-logo.svg"
          alt="Firefly"
          width={100}
          height={44}
        />
        <AccountIcon />
      </div>
    </div>
  )
}
