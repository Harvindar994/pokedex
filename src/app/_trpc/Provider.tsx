"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

import { trpc } from "./client";
import { DevelopmentMode } from "../config/config";


export default function Provider({ children }: { children: React.ReactNode }) {
  let url=null;
  if (DevelopmentMode){
    url = "http://localhost:3000/api/trpc"
  }else{
    url = "https://pokedex-amber-tau.vercel.app/api/trpc"
  }

  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: url,
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}