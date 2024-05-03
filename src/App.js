import "./App.css";
import Card from "./components/card/Card";
import Filter from "./components/Filters/Filter";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [filterData, setFilterData] = useState({});
  const [updatedJobs, setUpdatedJobs] = useState();
  const [page, setPage] = useState(1);
  let jobData = useRef();
  const prvsJobs = useRef([]);
  const loading = useRef(false);
  let filters = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        limit: 10,
        offset: (page - 1) * 10,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      try {
        const response = await fetch(
          `https://api.weekday.technology/adhoc/getSampleJdJSON?page=${page}`,
          requestOptions
        );
        const result = await response.json();
        const data = result.jdList;

        jobData.current = data;

        if (prvsJobs.current.length > 0) {
          prvsJobs.current = [...prvsJobs.current, ...data];
        } else {
          prvsJobs.current = data;
        }

        handleFilter(filters.current);

        const updatedFilterData = {...filterData};
        for (const job of data) {
          for (const key in job) {
            if (!(key in updatedFilterData)) {
              updatedFilterData[key] = [];
            }
            updatedFilterData[key].push(job[key]);
          }
        }

        setFilterData(updatedFilterData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
        loading.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  let jobs_arr;
  if (updatedJobs) {
    jobs_arr = updatedJobs.map((item) => {
      return <Card job={item}></Card>;
    });
  }

  function handleFilter(newFilters) {
    const prvsFilter = { ...filters.current };
    for (const key in newFilters) {
      if (newFilters[key] === "") {
        delete prvsFilter[key];
        delete newFilters[key];
      }
    }
    filters.current = { ...prvsFilter, ...newFilters };

    if (Object.keys(filters.current).length === 0) {
      if (prvsJobs.current.length > 0) {
        setUpdatedJobs([...prvsJobs.current]);
      } else {
        prvsJobs.current = jobData.current;
        setUpdatedJobs(jobData.current);
      }
    } else {
      const updated_filter_jobs = prvsJobs.current.filter((item) => {
        for (const key in filters.current) {
          if (item[key] != filters.current[key]) {
            return false;
          }
        }
        return true;
      });
      prvsJobs.current = [...prvsJobs.current, ...updated_filter_jobs];
      setUpdatedJobs(updated_filter_jobs);
      loading.current = false;
    }

    if (document.body.clientHeight < window.innerHeight) {
      setPage((page) => page + 1);
      loading.current = true;
    }
  }
  return (
    <div className="App">
      {Object.keys(filterData).length > 0 && (
        <Filter handleFilter={handleFilter} filterData={filterData} />
      )}
      {jobs_arr ? <div className="jobs">{jobs_arr}</div> : <p>Loading...</p>}
      {loading.current && <div>Loading</div>}
    </div>
  );
}

export default App;
