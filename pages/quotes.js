import React, { useState, useEffect } from "react";

import Heading from "../components/Heading";
import Place from "../components/Place"
import Dropdown from "../components/Dropdown"


const data = [
  { id: 1, name: 'Door' },
  { id: 2, name: 'Depot' },
]

// add input type & perhaps combobox for options
const initialPlans = [
  {
    id: "length",
    name: "Length",
    description: "Above 5.5 meters",
    isChecked: false,
    unit: "meters",
  },
  {
    id: "width",
    name: "Width",
    description: "Above 1.7 meters",
    isChecked: false,
    unit: "meters",
  },
  {
    id: "height",
    name: "Height",
    description: "Above 2.1 meters",
    isChecked: false,
    unit: "meters",
  },
  {
    id: "weight",
    name: "Weight",
    description: "Above 2 metric tons",
    isChecked: false,
    unit: "tons",
  },
  {
    id: "ground_clearance",
    name: "Ground clearance",
    description: "Less than 15 centimeters",
    isChecked: false,
    unit: "centimeters",
  },
  {
    id: "value",
    name: "Valuation",
    description: "Above AUD80,000",
    isChecked: false,
    unit: "AUD",
  },
  {
    id: "auction_house",
    name: "From auction house",
    description: "Purchased from acution house",
    isChecked: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [plans, setPlans] = useState(initialPlans);
  const [noneFlag, setNoneFlag] = useState(true);

  const [fromPlaceID, setFromPlaceID] = useState("")
  const [toPlaceID, setToPlaceID] = useState("")

  function handleNone() {
    setNoneFlag(true);
    const updatedPlans = plans.map((item) => {
      return {
        ...item,
        isChecked: false,
      };
    });
    setPlans(updatedPlans);
  }

  function handleToggleCheck(id) {
    setNoneFlag(false);
    const newPlans = plans.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          isChecked: !item.isChecked,
        };
        return updatedItem;
      }
      return item;
    });
    setPlans(newPlans);
  }

  useEffect(() => {
    const checkFlag = plans.every((item) => item.isChecked === false);
    if (checkFlag) {
      setNoneFlag(true);
    } else {
      setNoneFlag(false);
    }
  }, [plans]);

  function handleSubmit(e) {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();
    alert("Submit");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    e.target.reset();
  }

  return (
    <>
      <Heading title="Quotes" />
      {/* Forms */}
      <form
        className="space-y-8 divide-y divide-gray-200 px-4 py-4 sm:px-6 lg:px-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200 px-4 py-4 sm:px-6 lg:px-8">
          {/* Shipment info */}
          <div>
            {/* Heading */}
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Shipment Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Order and vehicle details
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* From destination */}

              <Place label="From destination" getPlace={setFromPlaceID} />
              <Dropdown label="From type" data={data} />
              <Place label="To destination" getPlace={setToPlaceID}/>
              <Dropdown label="To type" data={data} />

              {/* Shipment Number */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="shipment-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shipment Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="shipment-number"
                    id="shipment-number"
                    autoComplete="off"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* PO Number */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="po-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  PO Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="po-number"
                    id="po-number"
                    autoComplete="off"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle info */}
          <div className="pt-8">
            {/* Heading */}
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Vehicle information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Vehicle information, you might need to provide additional
                details depend on the vehicle model.
              </p>
            </div>

            {/* Forms */}
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="vehicle-type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <div className="mt-1">
                  <select
                    id="vehicle-type"
                    name="vehicle-type"
                    autoComplete="vehicle-type"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>Vechicle</option>
                    <option>Caravan</option>
                    <option>Track</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="vehicle-make"
                  className="block text-sm font-medium text-gray-700"
                >
                  Make
                </label>
                <div className="mt-1">
                  <select
                    id="vehicle-make"
                    name="vehicle-make"
                    autoComplete="vehicle-make"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>List of brands here</option>
                    <option>BMW</option>
                    <option>Mercedes Benz</option>
                    <option>Toyota</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="vehicle-model"
                  className="block text-sm font-medium text-gray-700"
                >
                  Model
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="vehicle-model"
                    id="vehicle-model"
                    autoComplete="vehicle-model"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="vehicle-manufactured-year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Manufactured year
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="vehicle-manufactured-year"
                    id="vehicle-manufactured-year"
                    autoComplete="vehicle-manufactured-year"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Important Info */}
          <div className="pt-8">
            <div>
              <h3 className="text-lg font-bold leading-6 text-red-500 ">
                Important: Vehicle Limits
              </h3>
              <p className="mt-1 text-sm text-gray-500 ">
                Does any of the below apply to your vechicle?
              </p>
            </div>
            <div className="mt-3">
              <fieldset>
                <legend className="sr-only">Plan</legend>
                {/* Checkboxes */}
                <div className="mt-3 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-8">
                  {plans.map((plan) => (
                    <div key={plan.id} className="relative flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id={plan.id}
                          aria-describedby={`${plan.id}-description`}
                          checked={plan.isChecked}
                          onChange={() => handleToggleCheck(plan.id)}
                          type="checkbox"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor={plan.id}
                          className="font-medium text-gray-700"
                        >
                          {plan.name}
                        </label>
                        <p
                          id={`${plan.id}-description`}
                          className="text-gray-500"
                        >
                          {plan.description}
                        </p>

                        <div className="relative mt-1 rounded-md shadow-sm">
                          <input
                            type={plan.isChecked ? "text" : "hidden"}
                            name={plan.name}
                            id={plan.id}
                            className="block w-13 rounded-md border-none pr-8 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder={"0.00"}
                            aria-describedby="price-currency"
                            defaultChecked={true}
                          />

                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span
                              className="text-gray-500 sm:text-sm"
                              id="price-currency"
                              hidden={plan.isChecked ? false : true}
                            >
                              {plan.unit}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div key="none-flag" className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="none-flag"
                        name="none-flag"
                        type="checkbox"
                        checked={noneFlag}
                        onChange={handleNone}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="None"
                        className="font-medium text-gray-700"
                      >
                        None applies
                      </label>
                      <p id="None" className="text-gray-500">
                        {/* insert here for none desc */}
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          {/* Text Box */}
          <div className="pt-8">
            <div>
              <h3 className="text-lg font-bold leading-6 text-gray-900 ">
                Comments
              </h3>
            </div>
            <div className="mt-3">
              <div>
                <label
                  htmlFor="comments"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add your comment
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="comments"
                    id="comments"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
