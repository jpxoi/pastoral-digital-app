"use client";

import { useEffect, useState } from "react";
import { ExclamationTriangle } from "../icons/icons24";
import { getLocalStorageItem } from "@/app/utils/localStorageUtils";

export default function WarningSuspended() {
  const [suspended, setSuspended] = useState<boolean>(false);

  useEffect(() => {
    const suspended = getLocalStorageItem("suspended");
    if (suspended === "true") {
      setSuspended(true);
      return;
    }
  }, []);

  return (
    <>
      {suspended ? (
        <div
          id="warning"
          className="flex justify-center items-center"
        >
          <div className="flex justify-center bg-red-100 text-red-700 p-4 rounded-lg shadow-md transition-all duration-300">
            <span className="flex items-center">
              <ExclamationTriangle />
            </span>
            <p className="text-sm sm:text-base ml-4 text-left md:text-center">
              Por disposición del equipo de coordinación de la Pastoral, estás
              suspendido de los encuentros de los días sábados temporalmente.
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
