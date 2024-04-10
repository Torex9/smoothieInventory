"use client";

import supabase from "@/database/superbaseClient";
import { useEffect, useState } from "react";
import SmoothieCard from "@/components/Smoothiecard";

export default function Home() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [smoothies, setSmoothies] = useState<any[] | null>(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id: number) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies?.filter((sm) => sm.id !== id) || null;
    });
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
        console.log(error);
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && <p className="text-red-500">{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p className="mb-3">Order by:</p>
            <button
              onClick={() => setOrderBy("created_at")}
              className="text-white cursor-pointer mr-2.5 px-2 py-1 rounded-md border-0 bg-[#12bca2]"
            >
              Time Created
            </button>
            <button
              onClick={() => setOrderBy("title")}
              className="text-white cursor-pointer mr-2.5 px-2 py-1 rounded-md border-0 bg-[#12bca2]"
            >
              Title
            </button>
            <button
              onClick={() => setOrderBy("rating")}
              className="text-white cursor-pointer mr-2.5 px-2 py-1 rounded-md border-0 bg-[#12bca2]"
            >
              Rating
            </button>
          </div>
          <div className="smoothies-grid grid grid-cols-[1fr_1fr_1fr] gap-10 mt-10">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
