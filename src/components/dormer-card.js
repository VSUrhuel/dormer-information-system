"use client"; // Ensures client-side execution in Next.js

import CustomHome from "@/components/custom-home";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Mail, MapPin, Phone } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function DormerCard() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Get email from URL params

  // Fetch dormer data from Supabase
  const fetchDormerData = async () => {
    if (!email) return [];
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", email);
    if (error) {
      console.error("Error fetching dormers:", error);
      return [];
    }
    return data;
  };

  // React Query for fetching data
  const {
    data: dormerData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dormerData", email],
    queryFn: fetchDormerData,
    enabled: !!email,
  });

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Card className={"lg:w-1/2 w-full h-full mx-auto"}>
        <CardHeader>
          <CardTitle>Dormer Information</CardTitle>
          <CardDescription>
            {isLoading
              ? "Loading..."
              : isError
              ? "Error fetching data"
              : `This is the information of ${
                  dormerData?.[0]?.name || "Unknown"
                }.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dormerData && dormerData.length > 0 ? (
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <img
                src={dormerData[0]?.profilePicture || "/default-profile.png"}
                className="w-80 h-92 object-cover rounded-lg"
                alt="Profile"
              />
              <div className="lg:grid lg:gap-1 lg:justify-start lg:items-start gap-4">
                <p className="font-normal text-sm">
                  <span className="font-bold text-2xl uppercase">
                    {dormerData[0]?.name}
                  </span>
                </p>
                <div className="flex items-center">
                  <MapPin className="h-5" />
                  <p className="ml-2 text-sm">{dormerData[0]?.address}</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5" />
                  <p className="ml-2 text-sm">{dormerData[0]?.email}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5" />
                  <p className="ml-2 text-sm">{dormerData[0]?.contact}</p>
                </div>
                <div>
                  <p>Course</p>
                  <p className="font-bold text-xl uppercase">
                    {dormerData[0]?.course}
                  </p>
                  <p className="italic">{dormerData[0]?.year} year</p>
                </div>
                <div>
                  <p>Dormitory</p>
                  <p className="font-bold text-xl uppercase">
                    {dormerData[0]?.dormName}
                  </p>
                </div>
                <div>
                  <p>Date of Stay</p>
                  <p className="font-bold text-lg uppercase">
                    {dormerData[0]?.dateOfStay}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>No dormer data found.</p>
          )}
        </CardContent>
      </Card>
    </QueryClientProvider>
  );
}
