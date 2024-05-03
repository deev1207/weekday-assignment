import "./App.css";
import Card from "./components/card/Card";
import Filter from "./components/Filters/Filter";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [filterData, setFilterData] = useState({});
  // const [filters, setFilters] = useState({});
  const [updatedJobs, setUpdatedJobs] = useState();
  const [page, setPage] = useState(1);
  let jobData = useRef()
  const prvsJobs = useRef([])
  const loading = useRef(false)
  let filters = useRef({})
  useEffect(()=>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "limit": 10,
      "offset": 0
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw // Pass the raw JSON string as the body
    };
    
    fetch(`https://api.weekday.technology/adhoc/getSampleJdJSON?page=${page}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result);  
        jobData.current = data.jdList
        console.log(data);

        // setUpdatedJobs(prvs=>[...prvs, ...data.jdList]);
        console.log(prvsJobs.current);
        if(prvsJobs.current.length>0){
          prvsJobs.current = [...prvsJobs.current,...data.jdList]
        }
        else{
          prvsJobs.current = [...data.jdList]
        }
        handleFilter(filters.current)


        const updatedFilterData = {};
        const jobs_arr = data.jdList
        console.log(jobs_arr);
        for (const job of jobs_arr) {
          for (const key in job) {
            if (!(key in updatedFilterData)) {
              updatedFilterData[key] = [];
            }
            updatedFilterData[key].push(job[key]);
          }
        }
       
        console.log(updatedFilterData);
        setFilterData(updatedFilterData);
      })
      .catch((error) => console.error(error));

      const handleScroll = () => {
       
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          console.log(52);
          setPage((prevPage) => prevPage + 1); // Increment page number
          loading.current=true
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  }, [page])


  
  let jobs_arr
  if(updatedJobs){
    console.log(updatedJobs);
    jobs_arr = updatedJobs.map((item) => {
      return <Card job={item}></Card>;
    });
  }




  function handleFilter(newFilters){
  const prvsFilter = {...filters.current}
    for(const key in newFilters){
      if(newFilters[key]===''){
        delete prvsFilter[key];
        delete newFilters[key]
      }
    }
    filters.current  = {...prvsFilter, ...newFilters}
    
    console.log({...prvsFilter, ...newFilters});
    // setFilters(cur_filter);

    if(Object.keys(filters.current).length === 0){
      if( prvsJobs.current.length>0){
        setUpdatedJobs([...prvsJobs.current])
      }
      else{
        prvsJobs.current = jobData.current
        setUpdatedJobs(jobData.current)
      }

    }
    else {
      const updated_filter_jobs = prvsJobs.current.filter((item, i)=>{
        for (const key in filters.current){
          if ( item[key] != filters.current[key]){
            console.log(key,item[key], filters.current[key])
            return false
          }
        }
        console.log(item)
        return true
      })
      console.log(updated_filter_jobs);
      prvsJobs.current = [...prvsJobs.current, ...updated_filter_jobs]
      setUpdatedJobs(updated_filter_jobs)
      loading.current = false
  }
  }
  return (
    <div className="App">
      {Object.keys(filterData).length > 0 && <Filter handleFilter={handleFilter} filterData={filterData} />}
      {jobs_arr?(<div className="jobs">{jobs_arr}</div>):( <p>Loading...</p>)}
      {loading.current && <div>Loading</div>}
    </div>
  );
}

export default App;
