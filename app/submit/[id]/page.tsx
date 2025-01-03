'use client'
import FileUpload from '@/public/images/upload-1.png';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2'
import { getServiceIncidents } from '@/lib/incident-utils';
import { ServiceIncident } from '@/types/ServiceIncident';

interface SubmitPageParams {
  id: string; // or number, depending on the type of id
}

function SubmitPage({ params }: { params: SubmitPageParams }) {
  const fileInputRef = useRef<HTMLInputElement>(null); 
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const caseSelected: ServiceIncident[] = getServiceIncidents().filter(
    (incident) => incident.INCIDENT_ID === Number(params.id)
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    const file = event.target.files && event.target.files[0]; 
    if (file) { 
      const reader = new FileReader(); 
      reader.onload = (e) => { 
        setImageSrc(e.target?.result as string); }; 
        reader.readAsDataURL(file);
    }
  };

  const submit = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
      }
      });
      Toast.fire({
          icon: "success",
          title: "Image submitted successfully!  Thank you"
  });
  };

  
  
    return (
      <main className="flex min-h-screen flex-col ">
        <section className="flex flex-row gap-4 p-8">
          <div className="flex-1 flex flex-col gap-4 ">
            <p className="font-bold text-2xl text-indigo-500">Case Id #{params.id}</p>
            <p>Case category: {caseSelected[0].CATEGORY}</p>
            <p>Latitude: {caseSelected[0].Coordinates?.latitude}</p>
            <p>Longitude: {caseSelected[0].Coordinates?.longitude}</p>
          </div>        
          <div className="flex items-center justify-center w-20 h-20 font-bold text-indigo-500 text-4xl">+{caseSelected[0].Points}</div>
        </section>
        <section className="m-8 p-0">
          <div className="flex flex-col items-center justify-center w-full">
            {!imageSrc &&
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Image src={FileUpload} alt="File Upload" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 mt-2">Take a Picture</p>
                </div>
                <input id="dropzone-file" type="file" width={20} className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            </label>
            }
            {imageSrc && <Image src={imageSrc} alt="Uploaded Image" width={100} height={100} className='w-full'/>}
          </div> 
        </section>
        <Link onClick={submit} href={`/`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-3/4 mx-auto text-center">Submit</Link>
      </main>
    );
  }

  export default SubmitPage