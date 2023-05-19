import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center h-92 flex align-middle justify-center">
      <div className="my-auto">
        <h1 className="font-bold text-white mb-10 text-7xl">Find Your Soul-Cat</h1>
        <a href="/dashboard" className=" secondary-button bg-red-600">
          Start Meowing
        </a>
      </div>
    </div>
  );
}
