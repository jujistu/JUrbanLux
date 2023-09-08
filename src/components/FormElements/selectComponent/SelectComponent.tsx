import { registrationFormControls } from '@/utils/ConstantData';

import React from 'react';

type SelectComponentProps = {
  label: string;
  value?: string | number;
  onChange?: (e: any) => void;
  options: (typeof registrationFormControls)[number][];
};

const SelectComponent = ({
  label,
  value,
  onChange,
  options,
}: SelectComponentProps) => {
  return (
    <div className='relative'>
      <p className=' px-2 py-0 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white'>
        {label}
      </p>
      <select
        value={value}
        onChange={onChange}
        className='border placeholder-gray-400 focus:outline-none focus:border-black w-full p-4 mx-0 mt-0 text-base block bg-white border-gray-300 rounded-md'
      >
        {options && options.length > 0 ? (
          options.map((optionsItem) => (
            <option
              id={optionsItem.id}
              key={optionsItem.id}
              value={optionsItem.id}
            >
              {optionsItem.label}
            </option>
          ))
        ) : (
          <option id='' value={''}>
            Select
          </option>
        )}
      </select>
    </div>
  );
};
export default SelectComponent;
