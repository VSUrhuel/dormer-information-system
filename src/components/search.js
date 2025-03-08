"use client";

import React, { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { Loader2, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ Correct for App Router (app/ directory)

import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export default function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Fetch function for dormers
  const fetchDormers = async () => {
    if (query.length <= 2) return [];

    const { data, error } = await supabase
      .from("user")
      .select("name, email")
      .ilike("name", `%${query}%`);

    if (error) {
      console.error("Error fetching dormers:", error);
      return [];
    }

    return data;
  };

  // Using react-query properly
  const { data, isLoading } = useQuery({
    queryKey: ["dormers", query],
    queryFn: fetchDormers,
    enabled: query.length > 2, // Only fetch if query length > 2
  });

  const handleClick = () => setOpen(true);

  const handleSelect = (value) => {
    const [name, email] = value.split("|");

    setTimeout(() => {
      router.push(`/dormer/${name}?email=${email}&name=${name}`);
    }, 100);
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className="items-start justify-start lg:w-64"
        variant="outline"
      >
        <SearchIcon className="h-4 w-4" />
        Find Dormer...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Find dormer..."
          value={query}
          onValueChange={setQuery}
        />

        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No dormer found.</CommandEmpty>
          )}
          <CommandSeparator />

          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}

          {data && data.length > 0 && (
            <CommandGroup heading="Suggestions">
              {data.map((dormer) => (
                <CommandItem
                  key={`${dormer.name}-${dormer.email}`}
                  value={`${dormer.name}|${dormer.email}`}
                  onSelect={handleSelect}
                >
                  <span className="flex items-center gap-2">
                    <SearchIcon className="h-4 w-4" />
                    {dormer.name}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
