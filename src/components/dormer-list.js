"use client";
import CustomHome from "@/components/custom-home";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DormerList() {
  const router = useRouter();
  const fetchDormers = async () => {
    const { data, error } = await supabase.from("user").select("*");

    if (error) {
      console.error("Error fetching dormers:", error);
      return [];
    }
    console.log(data);
    return data;
  };

  const {
    data: dormersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "dormers",
    queryFn: fetchDormers,
    enabled: true,
  });
  // console.log(dormersData);
  const [queryClient] = useState(() => new QueryClient());
  return (
    <CustomHome>
      <Card className={"lg:w-1/2 w-full h-full mx-auto"}>
        <CardHeader>
          <CardTitle className={"text-xl"}>List of Dormers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid space-y-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>Error fetching data</p>
            ) : (
              dormersData?.map((dormer) => (
                <div
                  onClick={() =>
                    router.push(`/dormer/${dormer.name}?email=${dormer.email}`)
                  }
                  key={dormer.email}
                  className="flex border border-white-100 rounded-md p-2 lg:p-4 gap-0 cursor-pointer"
                >
                  <img
                    src={dormer.profilePicture}
                    alt="placeholder"
                    className="rounded-md w-12 h-15 lg:w-24 lg:h-24 object-cover"
                  />
                  <div className="flex flex-col text-sm justify-center items-start lg:text-lg lg:ml-4 ml-2">
                    <p className="font-bold lg:text-2xl uppercase">
                      {dormer.name}
                    </p>
                    <p className="text-xs md:text-lg">{dormer.email}</p>
                    <p className="text-xs md:text-lg">{dormer.contact}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </CustomHome>
  );
}
