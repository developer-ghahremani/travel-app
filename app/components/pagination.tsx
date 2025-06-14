import lodash from "lodash";

type Props = {
  page: number;
  total: number;
  responseSize: number;
  onChange: (page: number) => void;
};

const Pagination = ({ page, onChange, total, responseSize }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <p
        onClick={() => +page !== 1 && onChange(+page - 1)}
        className={`border rounded-lg border-gray-300 px-3 py-1 ${
          +page === 1 ? "text-gray-300" : "cursor-pointer"
        }`}>
        Previous
      </p>
      <div className="flex gap-2">
        {lodash.range(1, Math.ceil(total / 8) + 1).map((item: number) => (
          <p
            key={item}
            onClick={() => onChange(item)}
            className={`border rounded-lg border-gray-300 px-3 py-1 cursor-pointer ${
              item === page ? "bg-primary-500 text-white" : ""
            }`}>
            {item}
          </p>
        ))}
      </div>
      <p
        onClick={() => page * 8 < total && onChange(+page + 1)}
        className={`border rounded-lg border-gray-300 px-3 py-1  ${
          page * 8 < total ? "cursor-pointer" : "text-gray-300"
        }`}>
        Next
      </p>
    </div>
  );
};

export default Pagination;
