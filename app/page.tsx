import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <p className="text-3xl">សូមស្វាគមន៍</p>
        <p className="text-3xl">សូមស្វាគមន៍ការគ្រប់គ្រងគ្រូបន្ទប់</p>
        <p className="text-3xl">Hello, Welcome to the Education CMS</p>
      </main>
    </div>
  );
}
