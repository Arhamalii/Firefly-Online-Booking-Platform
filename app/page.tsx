import MyBookingForm from "@/components/my-booking-form";
import { CalendarIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl pt-6 pb-6 flex flex-col gap-y-3 h-dvh w-full px-4 mx-auto">
      <div className="flex gap-3 items-center text-3xl">
        <CalendarIcon className="w-8 h-8" />
        <h2 className="scroll-m-20 font-semibold tracking-tight first:mt-0">My Booking</h2>
      </div>
      <div className="mb-3">
      <h3 className="text-2xl font-semibold text-[#333]">
        Manage your booking
      </h3>
      <p className="text-[#33333] text-base">
      Need to make changes to your booking? Manage your booking by entering your 6-digit booking reference number.
      </p>
      </div>
      <MyBookingForm />
    </div>
  );
}
