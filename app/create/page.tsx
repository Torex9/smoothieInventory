"use client";

import React, { useState } from "react";
import supabase from "@/database/superbaseClient";
import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [emails, setEmails] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !method || !rating || !customerName || !emails) {
      setFormError("Please fill in all fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .insert([{ title, method, rating, customerName, emails }])
      .select();

    if (error) {
      console.error(error);
      setFormError("Please fill in all fields correctly");
    }

    if (data) {
      console.log(data);
      setFormError(null);
      router.push("/");
    }
  };

  return (
    <div className="page create">
      <form
        onSubmit={handleSubmit}
        className="max-w-[480px] mx-auto my-0 p-5 rounded-md bg-white"
      >
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="block w-full box-border border mt-2.5 mb-5 mx-0 p-1.5 border-solid border-[#ccc]"
        />

        <label htmlFor="emails">Email:</label>
        <input
          type="text"
          id="emails"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          className="block w-full box-border border mt-2.5 mb-5 mx-0 p-1.5 border-solid border-[#ccc]"
        />

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
          Create Smoothie Recipe
        </button>

        {formError && <p className="error text-red-500">{formError}</p>}
      </form>
    </div>
  );
}
