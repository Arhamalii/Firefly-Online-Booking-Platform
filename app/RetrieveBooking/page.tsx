"use client";
import MyBookingForm from "@/components/my-booking-form";
import { useLoading } from "@/context";
import Link from "next/link";
import { useState } from "react";

export default function RetrieveBooking() {
  const [error, setError] = useState(false);
  const handleErrorState = (errorState: boolean) => {
    setError(errorState);
  };
  const { isLoading } = useLoading();

  return (
    <>
      <div
        className={`items-center justify-center my-3 ${
          error ? "flex" : "hidden"
        }`}
      >
        <div className="callout callout-error flex max-w-[1280px] text-[#333] font-mundialLight text-[14px] items-center w-full mx-4">
          <div className="font-icon-solid-14 icon">
            <img src="https://booking.fireflyz.com.my/images/Firefly/revamp/circle-exclamation.svg" />
          </div>
          <label>
            <strong>[1002:NoBookingFound]</strong> &nbsp;We are unable to locate
            the itinerary. Please verify the information is correct and try
            again.
          </label>
        </div>
      </div>
      <div className="max-w-7xl pt-6 pb-6 flex flex-col gap-y-3 h-dvh w-full px-4 mx-auto">
        {/* <div className="flex gap-3 items-center text-3xl">
          <CalendarIcon className="w-8 h-8" />
          <h2 className="scroll-m-20 font-semibold tracking-tight first:mt-0">
            My Booking
          </h2>
        </div> */}
        <div
          className={`menu-container mb-[2rem] ${isLoading && "tabZcontrol"}`}
        >
          <Link className="menu-item" href={"/"}>
            <div className="menu-title selected font-mundialBold">
              <img
                className="active"
                src="https://booking.fireflyz.com.my/images/Firefly/v3/menu-flight.svg"
                style={{ display: "inline" }}
              />
              Book a Flight
            </div>
          </Link>
          <Link className="menu-item" href={"/RetrieveBooking"}>
            <div className="menu-title selected font-mundialBold underline-orange">
              <img
                className="active"
                src="https://booking.fireflyz.com.my/images/Firefly/v3/menu-calendar-day-selected.svg"
              />
              My Booking
            </div>
          </Link>
          <Link className="menu-item" href={"/WebCheckIn"}>
            <div className="menu-title selected font-mundialBold">
              <img
                className="not-active"
                src="https://booking.fireflyz.com.my/images/Firefly/v3/menu-tickets-airline.svg"
              />
              Check-In
            </div>
          </Link>
        </div>

        <div className="mb-3">
          <h3 className="text-2xl font-semibold text-[#333]">
            Manage your booking
          </h3>
          <p className="text-[#33333] text-base">
            Need to make changes to your booking? Manage your booking by
            entering your 6-digit booking reference number.
          </p>
        </div>
        <MyBookingForm onErrorStateChange={handleErrorState} />
      </div>
    </>
  );
}