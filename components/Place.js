import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";
import { Combobox, Transition } from "@headlessui/react";

import Image from "next/image";
import googleImg from "../public/google_on_white_hdpi.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function App({ label, getPlace }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      componentRestrictions: { country: "au" },
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (val) => {
    setValue(val, false);
    let pid = data.filter(function (x) {
      return x.description === val;
    })[0].place_id;
    submit(pid);
  };

  const submit = (id) => {
    const parameter = {
      // Use the "place_id" of suggestion from the dropdown (object), here just taking first suggestion for brevity
      placeId: id,
      // Specify the return data that you want (optional)
      fields: ["address_component"],
    };

    getDetails(parameter)
      .then((details) => {
        console.log("Details: ", details);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <>
      <div className="sm:col-span-4">
        <Combobox
          as="div"
          value={value}
          onChange={(e) => {
            handleSelect(e);
          }}
        >
          <Combobox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Combobox.Label>
          <div className="relative mt-1">
            <Combobox.Input
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              onChange={handleInput}
              autoComplete="off"
              spellCheck="false"
              disabled={!ready}
              displayValue={value}
            />
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            ></Transition>
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <Combobox.Option
                    as="li"
                    key={place_id}
                    value={description}
                    className={({ active }) =>
                      classNames(
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      )
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <span
                          className={classNames(
                            "block truncate",
                            selected && "font-semibold"
                          )}
                        >
                          {description}
                        </span>

                        {selected && (
                          <span
                            className={classNames(
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                              active ? "text-white" : "text-indigo-600"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              <div className="flex justify-end h-5">
                <Image
                  src={googleImg}
                  objectFit="contain"
                  alt="Powered by Google"
                />
              </div>
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
    </>
  );
}
