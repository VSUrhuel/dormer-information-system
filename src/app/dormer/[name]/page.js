"use client";

import CustomHome from "@/components/custom-home";
import DormerCard from "@/components/dormer-card";
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
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// Fetch dormer data from supabase

export default function Dormer() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <CustomHome>
        <DormerCard />
      </CustomHome>
    </QueryClientProvider>
  );
}
