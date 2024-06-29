import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-primary w-full">
      <div className="max-w-7xl flex justify-between max-md:flex-col items-center px-6 mx-auto w-full bg-primary py-7">
        <div className="flex gap-4 items-center max-md:flex-col">
        <Image
          src="/footer-mas.svg"
          alt="Firefly"
          width={100}
          className="w-auto h-auto"
          height={44}
        />
        <Image
          src="/footer-maswing.svg"
          alt="Firefly"
          className="w-auto h-auto"

          width={100}
          height={44}
        />
        <Image
          src="/footer-flyamal.svg"
          alt="Firefly"
          className="w-auto pb-5 h-auto"

          width={100}
          height={44}
        />
        </div>

        <div className="flex justify-end items-end w-full gap-3 max-md:justify-center max-md:items-center flex-col">
          <div className="flex gap-4 max-md:flex-col items-center max-md:justify-center">
            <p className="text-white font-bold">Privacy</p>
            <p className="text-white font-bold">Legal</p>
            <p className="text-white font-bold">Terms & Conditions</p>
          </div>
          <p className="text-[12px] text-[#CFD4D6] font-bold">© FlyFirefly Sdn Bhd 199501017403(346606-K). All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
