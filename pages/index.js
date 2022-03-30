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
      console.log(_years);
      setYears(_years);
    })();
  }, []);

  return (
    <Layout>
      {years && (
        <div className="px-64 py-16">
          <div className="mt-8 grid gap-y-8 gap-x-16 grid-cols-3">
            {years.map((year, index) => (
              <YearFolder key={index} link={year.cover.link}></YearFolder>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
