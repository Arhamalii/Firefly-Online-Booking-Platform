import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Briefcase, CupSoda, Luggage, Star } from "lucide-react";
import Image from "next/image";
import { CiPlane } from "react-icons/ci";

export default function DetailsSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-auto p-0">
        <SheetHeader className="px-9 border-b pb-6 pt-14">
          <SheetTitle className="text-[24px] font-semibold">
            Trip details
          </SheetTitle>
        </SheetHeader>
        <div>
          <div className="md:px-9 w-full max-w-5xl mx-auto py-7 max-sm:px-2 border-b">
            <p className="text-[16px] font-semibold">Itinerary details</p>
            <div className="flex gap-6 h-56 my-4">
              <div className="flex flex-col justify-between w-fit">
                <div className="text-right">
                  <p>Sat, 00:50</p>
                  <p className="text-muted-foreground">8 Jun</p>
                </div>
                <p className="text-right">5h</p>
                <div className="text-right">
                  <p>Sat, 05:50</p>
                  <p className="text-muted-foreground">8 Jun</p>
                </div>
              </div>
              <Image
                alt="itinerary-details"
                src="/itinerary-details.png"
                width={10}
                height={200}
              />
              <div className="flex flex-col justify-between w-fit">
                <div>
                  <p className="font-semibold">Nanking/Nanjing Airport</p>
                  <span>NKG</span>
                </div>
                <div className="flex items-center justify-center text-[#565B5E] gap-2">
                  <CiPlane className="w-6 h-6" />
                  <p className="text-[12px]">
                    Operated by Firefly, FY3831 (738)
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Nanking/Nanjing Airport</p>
                  <span>NKG</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:px-9 py-7 max-sm:px-2 flex w-full flex-col">
            <p className="text-[16px] font-semibold mb-4">Fare details</p>
              <div className="rounded-lg border w-full flex flex-col">
              <div className="bg-[#ffdfc3] p-4 flex w-full flex-col rounded-t">
                <p className="text-[16px] text-primary font-semibold">Saver</p>
                <p className="text-[12px]">
                  The price you&apos;re paying includes the following for each
                  passenger
                </p>
              </div>
              <div className="p-4 flex flex-col gap-y-2">
                <div className="flex gap-3 items-center">
                  <Briefcase className="w-5 h-5" /> 7 kg carry-on baggage
                </div>
                <div className="flex gap-3 items-center">
                  <Luggage className="w-5 h-5" /> 20 kg checked baggage
              </div>
              <div className="flex gap-3 items-center">
                  <CupSoda className="w-5 h-5" /> 20 kg checked baggage
              </div>
              <div className="flex gap-3 items-center">
                  <Star className="w-5 h-5" /> 20 kg checked baggage
              </div>

              </div>
          </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
