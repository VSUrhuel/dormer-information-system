"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CustomHome from "@/components/custom-home";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/components/form-schema";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Select } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function CustomForm() {
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
      dateOfStay: undefined, // Changed to undefined for date
      profilePicture: null,
    },
  });

  const formFields = [
    {
      name: "profilePicture",
      label: "Profile Picture",
      type: "file", // Add file input type
      description: "Upload a profile picture.",
    },
    {
      name: "name",
      label: "Full Name",
      placeholder: "Juan Dela Criuz",
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
      placeholder: "Mabolo Men's Home",
      description: "Enter the name of your dormitory.",
    },

    {
      name: "dateOfStay",
      label: "Date of Stay",
      placeholder: "",
      description: "Select the date you started staying.",
      type: "date",
    },
  ];

  const [preview, setPreview] = React.useState(null);
  const [file, setFile] = React.useState(null);

  const checkImageExists = async (fileName) => {
    try {
      const { data, error } = await supabase.storage
        .from("profile-pictures")
        .list();
      if (error) {
        console.error("Error getting file URL:", error.message);
        return false;
      }
      const fileExists = data.some((file) => file.name === fileName);
      if (!fileExists) {
        console.log("File does not exist!");
        return false;
      }
      console.log("File exists!", data);
      return true;
    } catch (error) {
      console.error("Error in checkImageExists:", error);
      return null;
    }
  };
  const getProfilePicture = async (fileName) => {
    try {
      const { data, error } = await supabase.storage
        .from("profile-pictures")
        .getPublicUrl(fileName);
      console.log(data.publicUrl);
      if (error) {
        console.error("Error getting file URL:", error.message);
        return null;
      }
      console.log("File URL retrieved successfully!", data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error("Error in getProfilePicture:", error);
      return null;
    }
  };

  const checkDormerExists = async (email) => {
    try {
      const { data, error } = await supabase
        .from("user")
        .select()
        .eq("email", email);
      if (error) {
        console.error("Error getting dormer:", error.message);
        return false;
      }

      if (data.length === 0) {
        return false;
      }
      console.log("Dormer exists!", data);
      return true;
    } catch (error) {
      console.error("Error in checkDormerExists:", error);
      return null;
    }
  };

  const uploadProfilePicture = async (file) => {
    if (!file) return null;
    try {
      const exist = await checkImageExists(file.name);
      if (exist) {
        return getProfilePicture(file.name);
      }
      console.log("Uploading file:", file.name);
      const { data, error } = await supabase.storage
        .from("profile-pictures")
        .upload(file.name, file);
      if (error) {
        console.error("Error uploading file:", error.message);
        return null;
      }
      console.log(file.name);
      const { publicURL, error: urlError } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(file.name);
      if (urlError) {
        console.error("Error getting file URL:", urlError.message);
        return null;
      }
      console.log("File uploaded successfully!", publicURL);
      return publicURL;
    } catch (error) {
      console.error("Error in uploadProfilePicture:", error);
      return null;
    }
  };

  const resetForm = () => {
    form.reset();
    setFile(null);
    setPreview(null);
  };

  const handleSubmitForm = async (data) => {
    console.log("Form submitted");

    try {
      console.log(data);
      if (!file) {
        console.log("No file selected!");
        return;
      }

      const imageUrl = await uploadProfilePicture(file);

      // Check if dormer exists
      const dormerExists = await checkDormerExists(data.email);

      if (dormerExists) {
        const { error } = await supabase
          .from("user")
          .update([
            {
              name: data.name,
              age: data.age,
              address: data.address,
              contact: data.contact,
              email: data.email,
              course: data.course,
              year: data.year,
              room: data.room,
              dormName: data.dorm,
              dateOfStay: data.dateOfStay,
              profilePicture: imageUrl,
            },
          ])
          .eq("email", data.email);

        if (!error) {
          resetForm(); // Clear form inputs

          alert("User updated successfully!"); // Show success message
        } else {
          console.error("Error updating data:", error.message);
        }
        return;
      }

      // Insert new dormer if not exists
      const { error } = await supabase.from("user").insert([
        {
          name: data.name,
          age: data.age,
          address: data.address,
          contact: data.contact,
          email: data.email,
          course: data.course,
          year: data.year,
          room: data.room,
          dormName: data.dorm,
          dateOfStay: data.dateOfStay,
          profilePicture: imageUrl,
        },
      ]);

      if (!error) {
        resetForm(); // Clear form inputs
        alert("User saved successfully!"); // Show success message
      } else {
        console.error("Error inserting data:", error.message);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result);
        console.log("no error");
      };
    }
  };

  const { theme } = useTheme();

  const isDark = theme === "dark"; // Defaults to light mode

  return (
    <Card className="md:max-w-1/2 mx-auto">
      <CardHeader>
        <img
          src={isDark ? "/white-icon.png" : "/dark-icon.png"}
          className="w-40 h-full lg:w-60"
          alt="White Icon"
        />

        <CardTitle>Dormer Information</CardTitle>
        <CardDescription>
          Kindly fill up this form with the dormer's information.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitForm)}>
            {preview && (
              <img
                src={preview}
                alt="Profile Picture Preview"
                className="w-40 h-full object-cover mb-4 rounded-lg"
              />
            )}
            {formFields.map((item) => (
              <FormField
                control={form.control}
                name={item.name}
                key={item.name}
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem className="pb-4">
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      {item.type === "select" ? (
                        <Select onValueChange={onChange} value={value}>
                          <SelectTrigger>
                            <SelectValue placeholder={item.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {item.options.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : item.type === "file" ? (
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            handleFileChange(e);
                          }}
                          {...rest}
                        />
                      ) : item.type === "date" ? (
                        <Input onChange={onChange} {...rest} type="date" />
                      ) : (
                        <Input
                          onChange={onChange}
                          value={value}
                          {...rest}
                          placeholder={item.placeholder}
                          type={item.type || "text"}
                        />
                      )}
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors[item.name]?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" variant="outline" className="mt-2 w-full">
              SUBMIT
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
