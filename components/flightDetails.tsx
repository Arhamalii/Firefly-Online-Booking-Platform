import {
  convertTimeToHrs,
  createAbbreviation,
  formatDate,
} from "@/lib/formatting";
import { ArrowRightIcon, ChevronRightIcon, PlaneTakeoff } from "lucide-react";
import { CiPlane } from "react-icons/ci";
import DetailsSheet from "./details-sheet";
import { Button } from "./ui/button";

const FlightDetails = ({
  start_airport,
  end_airport,
  date,
  start_fly_time,
  end_fly_time,
  flight_no,
}: any) => {
  return (
    <div className="border rounded-lg w-full my-[1em]">
      <div className="border-b grid grid-cols-2 gap-4 max-[640px]:grid-cols-1 py-3 px-6">
        <div className="flex gap-2 text-primary items-center font-semibold">
          <p>{start_airport}</p>
          <ArrowRightIcon className="w-5 h-5" />
          <p>{end_airport}</p>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <p>{formatDate(date)}</p>
          <button className="border rounded-md border-primary text-primary font-bold text-[12px] px-5 py-1">
            SAVER
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 max-[640px]:grid-cols-1 items-center py-5 px-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <h4 className="text-xl">
              <span className="font-bold">{start_fly_time} -</span>
              <span> {createAbbreviation(start_airport)}</span>
            </h4>
            <p className="text-[12px] text-muted-foreground">{start_airport}</p>
          </div>
          <div className="flex items-center justify-center flex-col">
            <div className="border-t-2 w-36" />
            <CiPlane className="w-6 h-6 text-muted-foreground mt-[-12px] bg-white" />
            <p className="text-[12px] text-muted-foreground">
              Non-stop, {convertTimeToHrs(start_fly_time, end_fly_time)}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <h4 className="text-xl">
              <span className="font-bold">{end_fly_time} -</span>
              <span> {createAbbreviation(end_airport)}</span>
            </h4>
            <p className="text-[12px] text-muted-foreground">{end_airport}</p>
          </div>
          <div className="flex items-center justify-center text-muted-foreground gap-2">
            <PlaneTakeoff className="w-4 h-4" />
            <p className="text-[12px]">{flight_no}</p>
          </div>
          <DetailsSheet
            date={date}
            end_airport={end_airport}
            start_airport={start_airport}
            flight_no={flight_no}
            end_fly_time={end_fly_time}
            start_fly_time={start_fly_time}
          >
            <Button variant="link" className="text-[12px] font-semibold">
              View details
              <ChevronRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </DetailsSheet>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
