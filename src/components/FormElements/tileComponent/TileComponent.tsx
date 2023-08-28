import { AvailableSizes } from '@/utils/ConstantData';

type TileProps = {
  data: typeof AvailableSizes;
  onClick: (e: (typeof AvailableSizes)[number]) => void;
  selected: [];
};

export const TileComponent = ({ data, selected, onClick }: TileProps) => {
  return data && data.length ? (
    <div className='mt-3 flex flex-wrap items-center gap-1'>
      {data.map((dataItem) => (
        <label
          onClick={() => onClick(dataItem)}
          className={`cursor-pointer ${
            selected &&
            selected.length &&
            selected.map((item: any) => item.id).indexOf(dataItem.id) !== -1 //meanin there's a value in the array
              ? 'bg-black'
              : ''
          }`}
          key={dataItem.id}
        >
          <span
            className={`rounded-lg border border-black px-6 py-2 font-bold ${
              selected &&
              selected.length &&
              selected.map((item: any) => item.id).indexOf(dataItem.id) !== -1
                ? 'text-white'
                : ''
            }`}
          >
            {dataItem.label}
          </span>
        </label>
      ))}
    </div>
  ) : null;
};
