import React, { useState } from "react";
import banner from "../images/banner_mapsHD.png";
import { useForm } from "react-hook-form";

const Hero = () => {
  const { register, handleSubmit } = useForm();

  let 

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    const res = await fetch("http://localhost:5000/upload-file1", {
      method: "POST",
      body: formData,
    }).then(
      (res) => res.json()
      // console.log(JSON.stringify(`${res.message}, status: ${res.status}`));
    );
  };




  return (
    <>
      <div
        className='flex w-full justify-center items-center h-100'
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className='flex lg:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
          <div className='flex flex-1 justify-start items-start flex-col mf:mr-10'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type='file' {...register("file")} />

              <input type='submit' />
            </form>
          </div>

          <div className='flex flex-1 justify-end items-start flex-col mf:mr-10 w-full '>
            <h1 className='text-left mt-5 text-gray-800 font-medium leading-6  md:w-9/12 w-11/12 text-base mr-15'>
              Xác định thông tin
            </h1>
            <p class='w-44 sm:w-64 lg:w-2/3 mt-4 text-base leading-6 xl:leading-5 text-gray-800'>
              Hiển thị thông tin vị trí của hồ sơ
            </p>
          </div>
        </div>
      </div>

      <div className='flex justify-end items-center'>
        {/* <img
          class='object-cover md:hidden  w-full h-60'
          src={banner}
          alt='background'
        /> */}

        {/* <div class=' flex xl:px-20 justify-start items-start flex-col'>
          <label
            class='block mb-2 text-sm font-medium dark:text-white'
            for='file_input'
          >
            Upload file
          </label>
          <input
            class='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
            id='file_input'
            type='file'
          />
        </div> */}

        {/* <img
          class='hidden md:block object-cover  w-full h-50 lg:h-100'
          src={banner}
          alt='background'
        />
        <div class=' flex xl:px-20 justify-start items-start flex-col absolute'>
          <h1 class='text0-xl xl:text-2xl font-medium leading-5 xl:leading-normal text-gray-800'>
            Sale now on
          </h1>
          <p class='w-44 sm:w-64 lg:w-2/3 mt-4 text-base leading-6 xl:leading-5 text-gray-800'>
            Shop our mid Season sale for a range of discounted items
          </p>
          <button class='mt-5 xl:mt-6 hover:underline underline-offset-4 transition duration-300 ease-in-out flex justify-start items-center space-x-2'>
            <p class='text-base font-medium leading-none pb-0.5'>Shop Sale</p>
            <svg
              width='6'
              height='12'
              viewBox='0 0 6 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M0.21967 0.96967C0.512563 0.676777 0.987437 0.676777 1.28033 0.96967L5.78033 5.46967C6.07322 5.76256 6.07322 6.23744 5.78033 6.53033L1.28033 11.0303C0.987437 11.3232 0.512563 11.3232 0.21967 11.0303C-0.0732233 10.7374 -0.0732233 10.2626 0.21967 9.96967L4.18934 6L0.21967 2.03033C-0.0732233 1.73744 -0.0732233 1.26256 0.21967 0.96967Z'
                fill='#242424'
              />
            </svg>
          </button> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default Hero;
