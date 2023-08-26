import React from 'react';

type InputComponentProps = {
  label: string;
  placeholder: string;
  type: string;
  onChange?: (e: any) => void;
  value?: number | string;
};

const InputComponent = ({
  label,
  placeholder,
  type,
  onChange,
  value,
}: InputComponentProps) => {
  return (
    <div className='relative'>
      <p className='py-0 absolute pr-2  pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium bg-white text-gray-600'>
        {label}
      </p>
      <input
        placeholder={placeholder}
        type={type || 'text'}
        value={value}
        onChange={onChange}
        className='border placeholder-gray-400 focus:outline-none focus:border-black w-full p-4 mx-0 mt-0 text-base block bg-white border-gray-300 rounded-md'
      />
    </div>
  );
};

export default InputComponent;
