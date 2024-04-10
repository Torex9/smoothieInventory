"use client";

import { useEffect, useState } from "react";
import supabase from "@/database/superbaseClient";
import { useRouter } from "next/navigation";

export default function Update({ params }: { params: { updateId: string } }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const urlID = params.updateId;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update({ title, method, rating })
      .eq("id", urlID)
      .select();

    if (error) {
      console.error(error);
      setFormError("Please fill in all fields correctly");
    }

    if (data) {
      setFormError(null);
      console.log(data);
      router.push("/");
    }
  };

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", urlID)
        .single();

      if (error) {
        router.push("/");
      }
      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        console.log(data);
      }
    };

    fetchSmoothie();
  }, [params.updateId, router]);
  return (
    <div className="page">
      <form
        onSubmit={handleSubmit}
        className="max-w-[480px] mx-auto my-0 p-5 rounded-md bg-white"
      >
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full box-border border mt-2.5 mb-5 mx-0 p-1.5 border-solid border-[#ccc]"
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="block w-full box-border border mt-2.5 mb-5 mx-0 p-1.5 border-solid border-[#ccc]"
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="block w-full box-border border mt-2.5 mb-5 mx-0 p-1.5 border-solid border-[#ccc]"
        />

        <button className="text-white cursor-pointer px-2 py-1.5 rounded-md border-0 bg-[#12bca2]">
          Update Smoothie Recipe
        </button>

        {formError && <p className="error text-red-500 mt-3">{formError}</p>}
      </form>
    </div>
  );
}
