"use client";
import CustomHome from "@/components/custom-home";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/components/form-schema";
import CustomForm from "@/components/form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      address: "",
      contact: "",
      email: "",
      course: "",
      year: "1st",
      room: "",
      dorm: "",
      dormerType: "New",
      dateOfStay: undefined, // Changed to undefined for date
    },
  });

  const formFields = [
    {
      name: "name",
      label: "Full Name",
      placeholder: "John Doe",
      description: "Enter your complete name.",
    },
    {
      name: "age",
      label: "Age",
      placeholder: "21",
      description: "Enter your age.",
    },
    {
      name: "address",
      label: "Address",
      placeholder: "123 Street, City",
      description: "Enter your current address.",
    },
    {
      name: "contact",
      label: "Contact Number",
      placeholder: "09XXXXXXXXX / +639XXXXXXXXX",
      description: "Valid PH number format only.",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "you@example.com",
      description: "Enter a valid email address.",
    },
    {
      name: "course",
      label: "Course",
      placeholder: "BS Computer Science",
      description: "Enter your enrolled course.",
    },
    {
      name: "year",
      label: "Year Level",
      placeholder: "",
      description: "Select your current year level.",
      type: "select",
      options: ["1st", "2nd", "3rd", "4th", "5th"],
    },
    {
      name: "room",
      label: "Room Number",
      placeholder: "101",
      description: "Enter your assigned room number.",
    },
    {
      name: "dorm",
      label: "Dormitory Name",
      placeholder: "VSU Dorm A",
      description: "Enter the name of your dormitory.",
    },
    {
      name: "dormerType",
      label: "Dormer Type",
      placeholder: "",
      description: "Select if you are a new or old dormer.",
      type: "select",
      options: ["New", "Old"],
    },
    {
      name: "dateOfStay",
      label: "Date of Stay",
      placeholder: "",
      description: "Select the date you started staying.",
      type: "date",
    },
  ];

  const handleSubmit = (data) => {
    console.log(data);
  };

  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <CustomHome>
        <CustomForm></CustomForm>
      </CustomHome>
    </QueryClientProvider>
  );
}
