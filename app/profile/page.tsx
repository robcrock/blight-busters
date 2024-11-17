import { Slider } from "@/components/ui/slider"

import ProfileImage from "@/components/ProfileImage";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/public/images/arrow.png"

function ProfilePage() {
  
  return (
    <div className="flex flex-col items-center mt-4">
      <div className="w-full relative">
        <Link href="/"><Image src={Arrow} alt="Go to Map" className=' absolute rotate-180 ml-4' width={20} height={20} /></Link>
      </div>
      {/* Profile Header */}
      <div className="relative mt-6">
        <ProfileImage src="/images/profile_pic.jpeg" alt="Mayor Young" size={100} />
        <div className="absolute bottom-2 shadow-md left-1/2 transform -translate-x-1/2 translate-y-1/2 rounded-full border border-black w-[35px] h-[35px] flex items-center justify-center bg-white">
          <span className="font-bold text-2xl text-center">
            1
          </span>
        </div>
      </div>
      <h1 className="font-bold text-3xl mt-6">Mayor Young</h1>

      {/* Current Points */}
      <div className="w-[80%]">
        <div className="relative inline-flex items-center justify-between w-full mt-8 mb-6">
          <div className="inline-flex">
            <h2 className="text-indigo-500 font-semibold text-xl mr-2">Current points</h2>
            <span className="text-gray-500 mt-[2px]">as of 11/17/2024</span>
          </div>
          <span className="text-indigo-500 font-bold text-5xl">25</span>
        </div>
        <Slider disabled defaultValue={[25]} min={5} max={100} step={1} />
        <div className="relative inline-flex items-center justify-between w-full mt-2">
          <span>5</span>
          <span className="text-green-600">100</span>
        </div>
        <div className="relative inline-flex items-center">
          <span className="text-gray-500 text-sm">
            75 points needed for the next
          </span>
          <Image src={"/images/medal.png"} alt="Badge" width={20} height={20}></Image>
        </div>
      </div>

      {/* Incident Data */}
      <div className="w-[80%] items-center mt-4">
      <h2 className="font-semibold mt-8 text-2xl text-center mb-4">Submitted Incidents</h2>
      <div className="rounded-sm shadow-md border inline-flex items-center justify-between w-full h-20 px-6 mb-4">
        <h3 className="text-2xl">Approved</h3>
        <span className="text-indigo-500 font-bold text-5xl">10</span>
      </div>
      <div className="rounded-sm shadow-md border inline-flex items-center justify-between w-full h-20 px-6 mb-4">
        <h3 className="text-2xl">Review in progress</h3>
        <span className="text-yellow-300 font-bold text-5xl">3</span>
      </div>
      <div className="rounded-sm shadow-md border inline-flex items-center justify-between w-full h-20 px-6">
        <h3 className="text-2xl">Revisions Needed</h3>
        <span className="text-red-400 font-bold text-5xl">6</span>
      </div>
      </div>
    </div>
  );
}

export default ProfilePage