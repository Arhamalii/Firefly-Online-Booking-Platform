"use client";
import FlightDetails from "@/components/flightDetails";
import AnimatedCollapse from "@/components/ui/animation";
import { useLoading } from "@/context";
import { fetchFromAPI } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  CircleHelp,
  CircleUser,
  LucideIcon,
  Mail,
  Printer,
  Search,
  Split,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaArrowRight, FaRegEdit } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import {
  createAbbreviation,
  formatBirthdayDate,
  formatDate,
  getNameAbb,
} from "../../lib/formatting";
interface Passenger {
  first_name: string;
  last_name: string;
  passenger_type: string;
  // Add other properties for Passenger
}

interface Record {
  flightNumber: string;
  departure: string;
  arrival: string;
  passenger_birthday: string;
  passenger_sex: string;
  get_flight_info: {
    created_at: string;
    start_airport: string;
    end_airport: string;
    start_fly_time: string;
    end_fly_time: string;
    date: string;
    flight_no: string;
  };
  // Add other properties for Record
}

interface FlightInfo {
  passengers: Passenger[];
  records: Record[];
}

export default function Page({
  params,
}: {
  params: {
    code: string;
  };
}) {
  const [isChecked, setIsChecked] = useState(false);
  const { setIsLoading, isLoading } = useLoading();
  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setIsChecked(true) : setIsChecked(false);
  };
  // details state
  const [details, setDetails] = useState<FlightInfo>({
    passengers: [],
    records: [],
  });
  const { push } = useRouter();

  // Example type assertion if you know the structure

  // fetch function
  const fetchDetais = async () => {
    setIsLoading(true);
    try {
      const { data } = await fetchFromAPI(
        `api/web/flight/queryCode?code=${params.code}`
      );
      if (data.data.records.length > 0) {
        setDetails(data.data);
      } else {
        push("/");
      }
    } catch (error: any) {
      alert("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDetais();
  }, [params.code]);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isLoading]);

  return (
    <div className="max-w-7xl pt-6 pb-6 w-full px-4 mx-auto grid grid-cols-[3.5fr_1.5fr] max-[930px]:grid-cols-1 gap-12">
      <div className="flex flex-col gap-y-6 w-full mt-7">
        <h3 className="text-2xl font-semibold text-[#333]">
          Manage your booking
        </h3>
        <div className="flex gap-y-[0.20rem] flex-col my-4">
          <p className="font-mundialLight text-[#333] text-xl">
            Your booking reference:{" "}
            <span className="text-primary font-bold">{params.code}</span>
          </p>
          <p className="font-mundialLight text-[#333] text-xl">
            Booking status:{" "}
            <span className="text-primary font-bold">Closed</span>
          </p>
          <p className="font-mundialLight text-[#333] font-light text-xl">
            Booking date:{" "}
            <span className="text-primary font-bold">
              {formatDate(details?.records[0]?.get_flight_info.created_at)}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-y-4">
            <h4 className="text-xl font-mundialBold text-[#333] ">
              Your itinerary
            </h4>
            <div className="flex flex-col gap-y-3">
              <p className="font-mundialLight text-[#565B5E]">Departure</p>
              {details.records?.map((record) => (
                <FlightDetails
                  start_airport={record.get_flight_info.start_airport}
                  end_airport={record.get_flight_info.end_airport}
                  start_fly_time={record.get_flight_info.start_fly_time}
                  end_fly_time={record.get_flight_info.end_fly_time}
                  flight_no={record.get_flight_info.flight_no}
                  date={record.get_flight_info.date}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-7">
            <h4 className="text-xl font-[630] text-[#333] font-mundialRegular tracking-[0.010em]">
              {" "}
              Passengers
            </h4>
          </div>
        </div>
        {/* passenger list */}
        {/*  API : iterate all passengers from here */}

        {/* passengers  */}

        {details?.passengers.map((passengers, i) => (
          <div
            className="w-full"
            style={{
              backgroundColor: "white",
              border: "1px solid #E1E7EA",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <details className="group">
              <summary data-passenger="1" style={{ listStyleType: "none" }}>
                <div className="row my-3 mx-4">
                  <div className="flex justify-between">
                    <div className="box-orange bg-[#F38220] w-[42px] h-[42px] flex justify-center items-center rounded-md">
                      <span className="text-white">
                        {getNameAbb(
                          passengers?.first_name + " " + passengers?.last_name
                        )}
                      </span>
                    </div>
                    <div
                      className="col w-auto mx-7 text-[#333]"
                      style={{ alignSelf: "center" }}
                    >
                      <div className="text-[14px]">
                        <span
                          className="textW600 itinerary-passengerName font-bold"
                          id="itinerary-passengerName1"
                          data-passenger="1"
                          data-name="YANG  SHUXUAN"
                          data-name2="YANG SHUXUAN"
                        >
                          {details?.records[i].passenger_sex === "M"
                            ? "Mr"
                            : "Miss"}
                          {passengers.first_name} {passengers.last_name}
                        </span>
                        <span className="textW300">
                          {" "}
                          {passengers.passenger_type === "婴儿" || "infant"
                            ? "( Infant )"
                            : "( Adult )"}{" "}
                        </span>
                      </div>
                    </div>

                    <div
                      id="button-adult-drop-1"
                      className="cursor-pointer ml-auto w-auto self-center transition-transform duration-300 ease-in-out transform rotate-180"
                    >
                      <span className="float-right">
                        <IoIosArrowUp className="w-[20px] text-[#333] group-open:rotate-180 transition" />
                      </span>
                    </div>
                  </div>
                </div>
              </summary>

              <AnimatedCollapse toggle={true}>
                <div>
                  <div className="w-100 border-t border-gray-300 p-2.5 px-6 pb-5">
                    <div className=" mt-1 text-[14px] text-[#333] font-mundialRegular font-semibold">
                      Personal information
                    </div>
                    <div className="flex ">
                      <div className="w-1/2">
                        <div
                          className="text-[14px] text-[#333] font-mundialLight"
                          style={{ marginTop: "10px", color: "#717274" }}
                        >
                          Date of birth
                        </div>
                        <div
                          style={{ marginTop: "4px" }}
                          className="text-[14px] text-[#333] font-mundialLight"
                        >
                          {formatBirthdayDate(
                            details?.records[i].passenger_birthday
                          )}
                        </div>
                      </div>
                      <div className="w-1/2">
                        <div
                          className="text-[14px] text-[#333] font-mundialLight"
                          style={{ marginTop: "10px", color: "#717274" }}
                        >
                          Enrich Number
                        </div>
                        <div
                          style={{ marginTop: "4px" }}
                          className="text-[14px] text-[#333] font-mundialLight"
                        >
                          No information provided
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCollapse>
            </details>
          </div>
        ))}

        {/* -- */}

        {/* contact information */}
        <div className="flex flex-col mt-7">
          <h4 className="text-xl font-[630] text-[#333] font-mundialRegular">
            {" "}
            Contact Information
          </h4>
        </div>

        <div
          className="my-2 py-[0.14em] w-full"
          style={{
            backgroundColor: "white",
            border: "1px solid #E1E7EA",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          <details className="group  ">
            <summary data-passenger="1" style={{ listStyleType: "none" }}>
              <div className="row my-3 mx-4">
                <div className="flex justify-between">
                  <div
                    className="col w-auto mx-7 text-[#333]"
                    style={{ alignSelf: "center" }}
                  >
                    <div className="text-[16px]">
                      <span
                        className="textW600 itinerary-passengerName font-mundialBold"
                        id="itinerary-passengerName1"
                        data-passenger="1"
                        data-name="YANG  SHUXUAN"
                        data-name2="YANG SHUXUAN"
                      >
                        YANGYUJIE YANGYUJIE
                      </span>
                    </div>
                  </div>

                  <div
                    id="button-adult-drop-1"
                    className="cursor-pointer ml-auto w-auto self-center transition-transform duration-300 ease-in-out transform rotate-180"
                  >
                    <span className="float-right">
                      <IoIosArrowUp className="w-[20px] text-[#333] group-open:rotate-180 transition" />
                    </span>
                  </div>
                </div>
              </div>
            </summary>
            <div data-passenger="1" id="button-adult-down-1" className="box">
              <div>
                <div className="w-100 border-t border-gray-300 p-2.5 px-6 pb-5">
                  <div className="flex flex-col gap-y-[11px]">
                    <div className="flex items-center gap-y-11 gap-x-16 ">
                      <div
                        className="text-[14px] text-[#333] font-mundialLight"
                        style={{ color: "#717274" }}
                      >
                        Company Name
                      </div>
                      <div className="text-[14px] text-[#333] font-mundialLight">
                        21/02/1992
                      </div>
                    </div>
                    <div className="flex items-start gap-11">
                      <div
                        className="text-[14px] text-[#333] font-mundialLight"
                        style={{ color: "#717274" }}
                      >
                        Address name
                      </div>
                      <div className="text-[14px] text-[#333] font-mundialLight ml-[0.7rem]">
                        <span className="block mb-[11px]">
                          SHUYUEDONGLU 288HA{" "}
                        </span>
                        <span>B-709 </span>

                        <span className=" block mt-[11px]">610000 CHENGDU</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-11">
                      <div
                        className="text-[14px] text-[#333] font-mundialLight"
                        style={{ color: "#717274" }}
                      >
                        Email Adress
                      </div>
                      <div className="text-[14px] text-[#333] font-mundialLight ml-[1.32rem]">
                        1327199713@qq.com
                      </div>
                    </div>
                    <div className="flex items-center gap-11">
                      <div
                        className="text-[14px] text-[#333] font-mundialLight"
                        style={{ color: "#717274" }}
                      >
                        Phone number
                      </div>
                      <div className="text-[14px] text-[#333] font-mundialLight ml-[.5rem]">
                        8618080819620
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* Extra services 1 */}
        <div className="flex flex-col mt-7">
          <h4 className="text-xl font-[630] text-[#333] font-mundialRegular">
            {" "}
            Extra services
          </h4>
        </div>
        {/* service 1  */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex items-center font-semibold text-lg">
            <div className="bg-[#FCF5E6] w-14 h-14 flex justify-center items-center rounded-lg">
              <img
                src="https://booking.fireflyz.com.my/images/Firefly/revamp/view-itinerary-seat.svg"
                alt="seat_image"
              />
            </div>
            <div className="pl-4">
              <div className="text-gray-800 text-[16px] font-mundialLight">
                Seat selection
              </div>
              <div className="text-gray-600 text-sm font-mundialLight font-light">
                Your selected seats
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center py-4">
            <div className="bg-[#FAFBFC] border border-1 border-solid border-[#F4F4F4] rounded-lg w-full">
              <div
                id="STOPbutton-adult-up-seat11"
                className="flex items-center transition-all duration-300 ease-in-out pl-5 w-full py-3"
              >
                <img
                  src="https://booking.fireflyz.com.my/images/Firefly/revamp/itinerary-plane1.svg"
                  alt="plane icon"
                />
                <div className="ml-4">
                  <span className="font-semibold text-[14px] font-mundialBold ">
                    {`${
                      details.records[0]?.get_flight_info.start_airport
                    } (${createAbbreviation(
                      details.records[0]?.get_flight_info.start_airport
                    )}) to
                    ${
                      details.records[0]?.get_flight_info.end_airport
                    } (${createAbbreviation(
                      details.records[0]?.get_flight_info.end_airport
                    )})`}
                  </span>
                </div>
              </div>
              <div className="px-5">
                <div
                  id="button-adult-down-seat11"
                  className="border-t border-[#CED8DD]"
                >
                  {details?.passengers.map((passengers) => (
                    <div className="flex items-center justify-between py-3">
                      <div className="w-[45.67px] h-[42px] bg-[rgb(243,130,32)]  flex justify-center items-center rounded-md">
                        <span className="text-white text-[14px] font-mundialLight">
                          {getNameAbb(
                            passengers?.first_name + " " + passengers?.last_name
                          )}
                        </span>
                      </div>
                      <div className="ml-4 w-1/2">
                        <span className="text-[14px] font-mundialBold text-[#333]">
                          {passengers.first_name} {passengers.last_name}
                        </span>
                        <div className="text-gray-600 text-[12px] font-mundialLight">
                          {passengers.passenger_type === "婴儿" || "infant"
                            ? "( Infant )"
                            : "( Adult )"}
                        </div>
                      </div>
                      <div className="text-orange-500 w-1/2 text-[14px] font-mundialBold">
                        Not Assigned
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* service 2 */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex items-center font-semibold text-lg">
            <div className="bg-[#FCF5E6] w-14 h-14 flex justify-center items-center rounded-lg">
              <img
                src="https://booking.fireflyz.com.my/images/Firefly/revamp/view-itinerary-baggage.svg"
                alt="seat_image"
              />
            </div>
            <div className="pl-4">
              <div className="text-gray-800 text-[16px] font-mundialLight">
                Extra baggage
              </div>
              <div className="text-gray-600 text-sm font-mundialLight font-light">
                Your baggage allowance
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center py-4">
            <div className="bg-[#FAFBFC] border border-1 border-solid border-[#F4F4F4] rounded-lg w-full">
              <div
                id="STOPbutton-adult-up-seat11"
                className="flex items-center transition-all duration-300 ease-in-out pl-5 w-full py-3"
              >
                <img
                  src="https://booking.fireflyz.com.my/images/Firefly/revamp/itinerary-plane1.svg"
                  alt="plane icon"
                />
                <div className="ml-4">
                  <span className="font-semibold text-[14px] font-mundialBold ">
                    {`${
                      details.records[0]?.get_flight_info.start_airport
                    } (${createAbbreviation(
                      details.records[0]?.get_flight_info.start_airport
                    )}) to
                    ${
                      details.records[0]?.get_flight_info.end_airport
                    } (${createAbbreviation(
                      details.records[0]?.get_flight_info.end_airport
                    )})`}
                  </span>
                </div>
              </div>
              <div className="px-5">
                <div
                  id="button-adult-down-seat11"
                  className="border-t border-[#CED8DD]"
                >
                  {details?.passengers.map((passengers) => (
                    <div className="flex items-center justify-between py-3">
                      <div className="w-[45.67px] h-[42px] bg-[rgb(243,130,32)]  flex justify-center items-center rounded-md">
                        <span className="text-white text-[14px] font-mundialLight">
                          {getNameAbb(
                            passengers?.first_name + " " + passengers?.last_name
                          )}
                        </span>
                      </div>
                      <div className="ml-4 w-1/2">
                        <span className="text-[14px] font-mundialBold text-[#333]">
                          {passengers.first_name} {passengers.last_name}
                        </span>
                        <div className="text-gray-600 text-[12px] font-mundialLight">
                          {passengers.passenger_type === "婴儿" || "infant"
                            ? "( Infant )"
                            : "( Adult )"}
                        </div>
                      </div>
                      <div className="w-1/2 text-[14px] font-mundialBold flex flex-col">
                        <span className="font-mundialLight text-[14px] text-[#333]">
                          Baggage 20kg Free
                        </span>
                        <span className="font-mundialLight text-[12px] text-[#565B5E]">
                          USD 0.00
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* service 3 */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex items-center font-semibold text-lg">
            <div className="bg-[#FCF5E6] w-14 h-14 flex justify-center items-center rounded-lg">
              <img
                src="https://booking.fireflyz.com.my/images/Firefly/revamp/view-itinerary-utentils.svg"
                alt="meal"
              />
            </div>
            <div className="pl-4">
              <div className="text-gray-800 text-[16px] font-mundialLight">
                Meals
              </div>
              <div className="text-gray-600 text-sm font-mundialLight font-light">
                Your selected meals
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center py-4">
            <div className="bg-[#FAFBFC] border border-1 border-solid border-[#F4F4F4] rounded-lg w-full">
              <div
                id="STOPbutton-adult-up-seat11"
                className="flex items-center transition-all duration-300 ease-in-out pl-5 w-full py-3"
              >
                <img
                  src="https://booking.fireflyz.com.my/images/Firefly/revamp/itinerary-plane1.svg"
                  alt="plane icon"
                />
                <div className="ml-4">
                  <span className="font-semibold text-[14px] font-mundialBold ">
                    {`${
                      details.records[0]?.get_flight_info.start_airport
                    } (${createAbbreviation(
                      details.records[0]?.get_flight_info.start_airport
                    )}) to
                    ${
                      details.records[0]?.get_flight_info.end_airport
                    } (${createAbbreviation(
                      details.records[0]?.get_flight_info.end_airport
                    )})`}
                  </span>
                </div>
              </div>
              <div className="px-5">
                <div
                  id="button-adult-down-seat11"
                  className="border-t border-[#CED8DD]"
                >
                  {details?.passengers.map((passengers) => (
                    <div className="flex items-center justify-between py-3 ">
                      <div className="bg-orange-500 w-[45.67px] h-[42px] flex justify-center items-center rounded-md">
                        <span className="text-white text-[14px] font-mundialLight">
                          {getNameAbb(
                            passengers?.first_name + " " + passengers?.last_name
                          )}
                        </span>
                      </div>
                      <div className="ml-4 w-1/2">
                        <div>
                          <span className=" text-[14px] font-mundialBold text-[#333]">
                            {passengers.first_name} {passengers.last_name}
                          </span>
                        </div>
                        <div className="text-gray-600  text-[12px] font-mundialLight">
                          {passengers.passenger_type === "婴儿" || "infant"
                            ? "( Infant )"
                            : "( Adult )"}
                        </div>
                      </div>
                      <div className="w-1/2 text-[14px] font-mundialBold flex flex-col">
                        <span className="font-mundialLight text-[12px] text-[#333]">
                          No Meal
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* service 4 */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between font-semibold text-lg">
            <div className="flex">
              <div className="bg-[#FCF5E6] w-14 h-14 flex justify-center items-center rounded-lg">
                <img
                  src="https://booking.fireflyz.com.my/images/Firefly/revamp/bell-concierge.svg"
                  alt="extras"
                />
              </div>
              <div className="pl-4">
                <div className="text-gray-800 text-[16px] font-mundialLight">
                  Extra SSR
                </div>
                <div className="text-gray-600 text-sm font-mundialLight font-light">
                  Your extra services
                </div>
              </div>
            </div>
            <div className="flex items-center text-orange-500 cursor-pointer">
              <FaRegEdit className="w-[14px] h-10" />
              <span className="ml-2 text-[14px] font-mundialBold">Modify</span>
            </div>
          </div>

          <div className="flex justify-center items-center py-4">
            <div className="bg-[#FAFBFC] border border-1 border-solid border-[#F4F4F4] rounded-lg w-full">
              <div
                id="STOPbutton-adult-up-seat11"
                className="flex items-center transition-all duration-300 ease-in-out pl-5 w-full py-3"
              >
                <img
                  src="https://booking.fireflyz.com.my/images/Firefly/revamp/itinerary-plane1.svg"
                  alt="plane icon"
                />
                <div className="ml-4">
                  <span className="font-semibold text-[14px] font-mundialBold ">
                    {`${
                      details.records[0]?.get_flight_info.start_airport
                    } (${createAbbreviation(
                      details.records[0]?.get_flight_info.start_airport
                    )}) to
                    ${
                      details.records[0]?.get_flight_info.end_airport
                    } (${createAbbreviation(
                      details.records[0]?.get_flight_info.end_airport
                    )})`}
                  </span>
                </div>
              </div>
              <div className="px-5">
                <div
                  id="button-adult-down-seat11"
                  className="border-t border-[#CED8DD]"
                >
                  {details?.passengers.map((passengers) => (
                    <div className="flex items-center justify-between py-3 ">
                      <div className="bg-orange-500 w-[45.67px] h-[42px] flex justify-center items-center rounded-md">
                        <span className="text-white text-[14px] font-mundialLight">
                          {getNameAbb(
                            passengers?.first_name + " " + passengers?.last_name
                          )}
                        </span>
                      </div>
                      <div className="ml-4 w-1/2">
                        <div>
                          <span className=" text-[14px] font-mundialBold text-[#333]">
                            {passengers.first_name} {passengers.last_name}
                          </span>
                        </div>
                        <div className="text-gray-600  text-[12px] font-mundialLight">
                          {passengers.passenger_type === "婴儿" || "infant"
                            ? "( Infant )"
                            : "( Adult )"}
                        </div>
                      </div>
                      <div className="w-1/2 text-[14px] font-mundialBold flex flex-col">
                        <span className="font-mundialLight text-[12px] text-[#333]">
                          No Extra SSR
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* services end  */}
        {/* APi integarte : this part only show on printing */}
        <div className="hidden print:block">
          <div className="flex mt-7 justify-between items-center">
            <h4 className="text-xl font-[630] text-[#333] font-mundialRegular">
              {" "}
              Contact Information
            </h4>
          </div>

          <div className="ml-3 py-3">
            <h3 className="text-orange-500 text-[20px] font-mundialBold mb-2">
              YANGYUJIE YANGYUJIE
            </h3>
            <span className="text-[14px] text-[#333] font-mundialLight flex flex-col gap-y-[0.3rem]">
              <h6>
                Sichuan Global International Travel Service Company Limited
              </h6>
              <h6>SHUYUEDONGLU 288HAO</h6>
              <h6>B-709</h6>
              <h6>610000 CHENGDU</h6>
            </span>
            <div className="flex items-center gap-x-16 mt-[0.3rem]">
              <div className="text-[14px] text-[#333] font-mundialLight">
                Mobile Phone
              </div>
              <div className="text-[14px] text-[#333] font-mundialLight">
                :&nbsp; &nbsp; 8618080819620
              </div>
            </div>
            <div className="flex items-start gap-y-11 gap-x-16 mt-[0.3rem]">
              <div className="text-[14px] text-[#333] font-mundialLight">
                Alternate Phone
              </div>
              <div className="text-[14px] text-[#333] font-mundialLight -ml-[.94rem] ">
                : &nbsp; &nbsp;
              </div>
            </div>

            <div className="flex items-center gap-y-11 gap-x-16 mt-[0.3rem]">
              <div className="text-[14px] text-[#333] font-mundialLight">
                Email
              </div>
              <div className="text-[14px] text-[#333] font-mundialLight ml-[3.3rem]">
                : &nbsp; &nbsp; 1327199713@qq.com
              </div>
            </div>
          </div>
        </div>

        {/*print part end  */}

        {/* payment details */}
        <span className={isChecked ? "print:hidden" : ""}>
          <div className="flex mt-7 justify-between items-center">
            <h4 className="text-xl font-[630] text-[#333] font-mundialRegular">
              {" "}
              Payment details
            </h4>
            <div className="flex self-center print:hidden">
              <input
                className="form-check-input checkbox-box"
                type="checkbox"
                id="payment"
                onChange={handleCheckboxClick}
              />
              <label
                htmlFor="payment"
                className="ms-2  text-[#333] text-[14px] font-mundialLight mt-[0.20em]"
              >
                Do not print this section
              </label>
            </div>
          </div>

          <div
            className="my-2 py-[0.14em] w-full"
            style={{
              backgroundColor: "white",
              border: "1px solid #E1E7EA",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <details className="group  ">
              <summary data-passenger="1" style={{ listStyleType: "none" }}>
                <div className="row my-3">
                  <div className="flex justify-between">
                    <div
                      className="col w-auto mx-6 text-[#333]"
                      style={{ alignSelf: "center" }}
                    >
                      <div className="text-[14px] text-[#333]">
                        <span
                          className="textW600 itinerary-passengerName font-mundialBold"
                          id="itinerary-passengerName1"
                          data-passenger="1"
                          data-name="YANG  SHUXUAN"
                          data-name2="YANG SHUXUAN"
                        >
                          Total price &nbsp;
                        </span>
                        <span className="font-mundialLight">
                          (including taxes, fees)
                        </span>
                      </div>
                      <h3 className="text-[#333] text-[20px]  font-mundialBold">
                        USD 0.00
                      </h3>
                    </div>

                    <div
                      id="button-adult-drop-1"
                      className="cursor-pointer ml-auto w-auto self-center transition-transform duration-300 ease-in-out transform rotate-180"
                    >
                      <span className="float-right">
                        <IoIosArrowUp className="w-[20px] text-[#333] group-open:rotate-180 transition ml-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </summary>
              <div data-passenger="1" id="button-adult-down-1" className="box">
                <div>
                  <div className="w-100 px-6 pt-10 pb-4">
                    <div className="flex flex-col gap-y-[11px]">
                      <div className="flex items-center gap-y-11 gap-x-16 ">
                        <div className="text-[14px] text-[#333] font-mundialLight">
                          TOTAL PRICE
                        </div>
                        <div className="text-[14px] text-[#333] font-mundialLight">
                          :&nbsp; &nbsp; USD 0.00
                        </div>
                      </div>
                      <div className="flex items-start gap-y-11 gap-x-16 ">
                        <div className="text-[14px] text-[#333] font-mundialLight">
                          TOTAL PAID
                        </div>
                        <div className="text-[14px] text-[#333] font-mundialLight ml-[.54rem]">
                          : &nbsp; &nbsp;USD 0.00
                        </div>
                      </div>

                      <div className="flex items-center gap-y-11 gap-x-16 ">
                        <div className="text-[14px] text-[#333] font-mundialLight">
                          TOTAL DUE
                        </div>
                        <div className="text-[14px] text-[#333] font-mundialLight ml-[.66rem]">
                          : &nbsp; &nbsp; USD 0.00
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </span>

        {/* return navigtaion */}
        <Link
          href={"/"}
          className="flex items-center  gap-x-2 text-orange-500 text-[16px] font-mundialBold cursor-pointer print:hidden"
        >
          Return to home
          <FaArrowRight className="text-orange-500 text-[16px]" />
        </Link>
      </div>

      {/* right side panel  */}
      <div className="flex flex-col gap-2 print:hidden">
        <div className="rounded-lg p-4 bg-[#fcf5e6]">
          <h4 className="font-mundialBold text-[#333] text-[16px]">
            Manage booking
          </h4>
          <div className="flex flex-col gap-y-3 py-3">
            <span className="text-[14px] font-mundialLight text-[#333]">
              <PanelButton icon={CircleUser} label="Update passenger details" />
            </span>
            <span className="text-[14px] font-mundialLight text-[#333]">
              <PanelButton
                icon={Split}
                label="Divide booking"
                iconClassName="rotate-90"
              />
            </span>
          </div>
        </div>
        <div className="rounded-lg p-4 bg-[#fcf5e6]">
          <h4 className="font-semibold">Quick links</h4>
          <div className="flex flex-col gap-y-3 py-3">
            <span
              className="cursor-pointer text-[14px] font-mundialLight text-[#333]"
              onClick={() => window.print()}
            >
              <PanelButton icon={Printer} label="Print trip summary" />
            </span>
            <span className="text-[14px] font-mundialLight text-[#333]">
              <PanelButton icon={Mail} label="Resend itinerary email" />
            </span>
            <span className="text-[14px] font-mundialLight text-[#333]">
              <PanelButton icon={Search} label="Find another booking" />
            </span>
            <span className="cursor-pointer" onClick={() => window.print()}>
              <PanelButton icon={CircleHelp} label="I have an enquiry" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelButton({
  label,
  icon: Icon,
  link,
  iconClassName,
}: {
  label: string;
  icon: IconType | LucideIcon;
  link?: string;
  iconClassName?: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <Icon className={cn("w-5 h-5 text-primary", iconClassName)} />
        <p className="text-[14px]">{label}</p>
      </div>
      <ArrowRightIcon className="w-5 h-5 text-primary" />
    </div>
  );
}
