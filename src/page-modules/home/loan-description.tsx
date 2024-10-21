import React from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface LoanDescriptionProps {
  // eslint-disable-next-line
  data: any;
  title: string;
}

interface ParseJsonPrinterProps {
  // eslint-disable-next-line
  data: any;
}

const ParseJsonPrinter: React.FC<ParseJsonPrinterProps> = ({ data }) => {
  return (
    <>
      {typeof data === "string" && (
        <div key={"-1"} className="text-sm lg:text-base">
          {data}
        </div>
      )}
      {typeof data === "boolean" && (
        <div className="text-sm lg:text-base">
          {data ? (
            <CheckIcon className="text-primary-500 w-6 h-6" />
          ) : (
            <XMarkIcon className="text-error-500 w-6 h-6" />
          )}
        </div>
      )}
      {Array.isArray(data) && (
        <div className="text-sm lg:text-base">{data.join(", ")}</div>
      )}
      {!Array.isArray(data) &&
        typeof data === "object" &&
        Object.keys(data).map((_dataKey, index) => {
          return (
            <div className="flex gap-2 flex-wrap whitespace-pre" key={index}>
              <div className="text-sm lg:text-base font-semibold">
                {_dataKey}:
              </div>
              <ParseJsonPrinter data={data[_dataKey]} />
            </div>
          );
        })}
    </>
  );
};

const LoanDescription: React.FC<LoanDescriptionProps> = ({ data, title }) => {
  return (
    <div className="w-full flex flex-col gap-4 p-6 text-neutral-500">
      <div className="text-lg lg:text-xl font-bold">{title}</div>
      <div className="text-sm lg:text-base">{data.Description}</div>
      {Object.keys(data).map((_key, idx) => {
        if (_key === "Description") return null;
        return (
          <div key={idx} className="w-full flex flex-col gap-3">
            <div className="text-base lg:text-lg font-bold">{_key}</div>
            <ParseJsonPrinter data={data[_key]} />
          </div>
        );
      })}
    </div>
  );
};

export default LoanDescription;
