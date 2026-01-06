import Image from "next/image";
import Items from "./components/Items";


export default async function Home() {

  return (
    <div className=" flex justify-center items-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Items />
    </div>
  );
}