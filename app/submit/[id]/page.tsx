'use client'
import FileUpload from '../../images/upload-1.png';
import Image from 'next/image';
import React, { useRef } from 'react';

interface SubmitPageParams {
  id: string; // or number, depending on the type of id
}

function SubmitPage({ params }: { params: SubmitPageParams }) {
  
    return (
      <main className="flex min-h-screen flex-col p-8">

        <section className="flex flex-row gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <p className="font-bold">Case Id: M-JK-23456789</p>
            <p>Case catergory: Junk Yard</p>
            <p>Latitude: 38.8951</p>
            <p>Longitude: -77.0364</p>
          </div>        
          <div className="rounded-full bg-gray-200 flex items-center justify-center p-8 h-20 font-bold ">+25</div>
        </section>
        <section className="m-8">
          {/* <div className='flex flex-col items-center justify-center'>
            <Image src={FileUpload} alt="File Upload" />
            <input title="Take a Picture" type="file" className="appearance-none cursor-pointer hidden" alt="Click to upload" />
          </div> */}
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Image src={FileUpload} alt="File Upload" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 mt-2">Take a Picture</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
            </label>
        </div> 
        </section>
      </main>
    );
  }

  export default SubmitPage