import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import React, { useContext, useState, useEffect } from "react";
import { Loader } from ".";
import { shortenAddress } from "../utils/shortenAddress";

import banner from "../images/banner_mapsHD.png";
import { useForm } from "react-hook-form";

//import dataProcess from "../hook/dataProcess";npm
const Input = ({ placeholder, name, type, value, handleChange }) => {
  return (
    <>
      <input
        placeholder={placeholder}
        name={name}
        step='0.0001'
        type={type}
        value={value}
        onChange={(e) => handleChange(e, name)}
        className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"'
      />
    </>
  );
};

const INITIAL_STATE = {
  noun: "",
  noun2: "",
  adjective: "",
  color: "",
};

const commonCss =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-white font-light text-sm";

const Welcome = () => {
  const { register, handleSubmit } = useForm();
  const [ocrData, setOcrData] = useState();
  var data1 = {};

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    const res = await fetch("http://localhost:5000/upload-file1", {
      method: "POST",
      body: formData,
    });
    if (res) {
      let data = res.json();
      data.then((data) => {
        data1 = data;

        console.log(data1, "b");

        setOcrData(data);
      });
    }
  };

  useEffect(() => {}, [register]);

  const Data = ({ ocrData }) => {
    return (
      <>
        <div className='w-full md:w-96 md:max-w-full mx-auto'>
          <div className='p-6 border border-gray-300 sm:rounded-md'>
            {ocrData != undefined ? (
              ocrData?.map((data, i) => {
                <label className='block mb-6'>
                  <span className='text-gray-700'>{data.fieldName}</span>
                  <input
                    name='name'
                    type='text'
                    className='block  w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 '
                    placeholder={data.fieldName}
                    value={data.fieldName}
                  />
                </label>;
              })
            ) : (
              <>
                <label className='block mb-6'>
                  <span className='text-gray-700'>Thông tin chủ sơ hửu</span>
                  <input
                    name='vat'
                    type='text'
                    className='block  w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 '
                    placeholder='Thông tin chủ sơ hửu'
                  />
                </label>

                <label className='block mb-6'>
                  <span className='text-gray-700'>Thông tin vị trí</span>
                  <input
                    name='vat'
                    type='text'
                    className='block  w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 '
                    placeholder='Thông tin vị trí'
                  />
                </label>

                <label className='block mb-6'>
                  <span className='text-gray-700'>Thông tin chung</span>
                  <input
                    name='vat'
                    type='text'
                    className='block  w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 '
                    placeholder='Thông tin chung'
                  />
                </label>
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/*  */}

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
            <p className='w-44 sm:w-64 lg:w-2/3 mt-4 text-base leading-6 xl:leading-5 text-gray-800'>
              Hiển thị thông tin vị trí của hồ sơ
            </p>
          </div>
        </div>
      </div>

      {/*  */}
      <div className='flex w-full justify-center items-center'>
        <div className='flex lg:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
          <div className='flex flex-1 justify-start items-start flex-col mf:mr-10'>
            <h1 className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
              {/* {dataProcess.map((res, i) => {
                <h3>{`${res.fieldName} : ${res.fieldValue}`}</h3>;
              })} */}
            </h1>
            <p className='text-white mt-5 font-light md:w-9/12 w-11/12 text-base'>
              This application allows you to send ETH from your wallet to
              another address !
            </p>

            <div className='grid sm:grid-cols-2 grid-cols-3 w-full mt-10'>
              <div className={`rounded-tl-2xl ${commonCss}`}>Reliability</div>
              <div className={` ${commonCss}`}>Ethereum</div>
              <div className={`${commonCss}`}> Web 3.0</div>
              <div className={`rounded-br-2xl ${commonCss}`}>Blockchain</div>
            </div>
          </div>

          <div className='flex flex-1 justify-start items-start flex-col mf:mr-10'>
            <Data ocrData={data1?.data?.ress?.formData} />

            {/* <div className='w-full md:w-96 md:max-w-full mx-auto'>
              <div className='p-6 border border-gray-300 sm:rounded-md'> */}
            {/* <label className='block mb-6'>
                  <span className='text-gray-700'>Thông tin chủ sơ hửu</span>
                  <input
                    name='vat'
                    type='text'
                    className='block  w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 '
                    placeholder='Thông tin chủ sơ hửu'
                  />
                </label>

                <label className='block mb-6'>
                  <span className='text-gray-700'>Thông tin vị trí</span>
                  <input
                    name='vat'
                    type='text'
                    className='block  w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 '
                    placeholder='Thông tin vị trí'
                  />
                </label>

                <label className='block mb-6'>
                  <span className='text-gray-700'>Thông tin chung</span>
                  <input
                    name='vat'
                    type='text'
                    className='block  w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 '
                    placeholder='Thông tin chung'
                  />
                </label> */}
            {/* </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
