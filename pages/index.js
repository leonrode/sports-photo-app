import Layout from "../components/Layout";

import { useState, useEffect } from "react";

import { fetchYears } from "../_api/api";

import YearFolder from "../components/YearFolder";

export default function Home() {
  const [years, setYears] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await fetchYears();
      let _years = res;
      _years.sort((a, b) => ~~a.year < ~~b.year);

      setYears(_years);
      setLoading(false);
    })();
  }, []);

  return (
    <Layout>
      {years && !loading ? (
        <div className="px-8 md:px-16 md:py-4 lg:px-48 lg:py-16 ">
          <div className="mt-8 grid gap-y-8 gap-x-16 md:grid-cols-3">
            {years.map((year, index) => (
              <YearFolder key={index} year={year}></YearFolder>
            ))}
          </div>
          <div className="my-8"></div>
        </div>
      ) : (
        <h1 className="text-center">Loading content...</h1>
      )}
    </Layout>
  );
}
