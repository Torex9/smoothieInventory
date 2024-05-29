import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import supabase from "@/database/superbaseClient";

import { useRouter } from "next/navigation";

interface Smoothie {
  id: number;
  title: string;
  method: string;
  rating: number;
  emails: string;
  customerName: string;
}

interface SmoothieCardProps {
  smoothie: Smoothie; // Define the smoothie prop as the Smoothie type
  onDelete: (id: number) => void;
}

const SmoothieCard = ({ smoothie, onDelete }: SmoothieCardProps) => {
  const router = useRouter();

  async function handleSendEmail() {
    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({
        customerName: smoothie.customerName,
        emails: smoothie.emails,
      }),
    });

    router.push("/");
  }

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) {
      console.error(error);
    }

    if (data) {
      console.log(data);
      onDelete(smoothie.id);
    }
  };
  return (
    <div className="smoothie-card w-full box-border relative p-2.5 rounded-md bg-white min-h-40">
      <h3 className="font-bold mb-4">{smoothie.title}</h3>
      <p className="pb-6">{smoothie.method}</p>
      <p className="pb-6 text-[#12bca2] font-bold">{smoothie.customerName}</p>
      <p className="pb-12 text-[#12bca2] font-bold">{smoothie.emails}</p>

      <div className=" flex justify-center">
        <button
          className="bg-[#12bca2] p-2 rounded-lg hover:bg-[#1aff70]"
          onClick={handleSendEmail}
        >
          Send Email
        </button>
      </div>

      <div className="rating absolute text-white w-10 h-0 leading-[0px] text-center px-0 py-5 rounded-md -right-2.5 -top-2.5 bg-[#12bca2]">
        {smoothie.rating}
      </div>

      <div className="buttons absolute bottom-2.5 right-2.5">
        <Link href={`/${smoothie.id}`} className="flex gap-2">
          <p className="text-sm font-bold">Edit</p>
          <Pencil size={20} />
        </Link>
      </div>

      <div className="buttons absolute bottom-2.5 left-2.5">
        <div className="flex gap-2" onClick={handleDelete}>
          <p className="text-sm font-bold text-red-500">Delete</p>
          <Trash2 size={20} color="#FF0000" />
        </div>
      </div>
    </div>
  );
};
export default SmoothieCard;
