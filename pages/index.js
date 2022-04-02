import Layout from "../components/Layout";

import { useState, useEffect } from "react";

import { fetchYears } from "../_api/api";

import YearFolder from "../components/YearFolder";

export default function Home() {
  const [years, setYears] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetchYears();
      let _years = res;
      _years.sort((a, b) => ~~a.year < ~~b.year);

      setYears(_years);
    })();
  }, []);

  return (
    <Layout>
      {years && (
        <div className="md:px-16 md:py-4 lg:px-48 lg:py-16">
          <div className="mt-8 grid gap-y-8 gap-x-16 md:grid-cols-3">
            {years.map((year, index) => (
              <YearFolder key={index} year={year}></YearFolder>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
