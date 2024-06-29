"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  referenceNumber: z.string().length(6),
  contactEmail: z.string().email(),
});

// Modified MyBookingForm component
export default function MyBookingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { push } = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    push(`/${values.referenceNumber}`);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-4 w-full max-md:flex-col items-start grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1"
        >
          <div className="flex gap-y-1.5 flex-col">
            <FormField
              control={form.control}
              name="referenceNumber"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="BOOKING REFERENCE NUMBER"
                        id="referenceNumber"
                        className="px-2 pb-7 pt-8"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <p className="text-[12px] text-[#333]">
              Please use the 6-digit alphanumeric booking reference code.
            </p>
          </div>
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      label="CONTACT EMAIL"
                      className="px-2 pb-7 pt-8"
                      id="contactEmail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            className="px-2 pb-7 pt-8 text-lg flex items-center max-md:col-span-1 max-lg:col-span-2 gap-4 rounded-lg font-semibold"
          >
            My booking <ArrowRightIcon className="w-6 h-6 ml-2" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
