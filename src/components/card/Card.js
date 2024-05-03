import { useEffect } from "react";
import "./Card.css";

export default function Card({ job }) {
  useEffect(() => console.log(job));
  return (
    <div class="card">
      <div className="top">
        <img src={job.logoUrl} alt="Company Logo"></img>
        <div class="info">
          <div>{job.companyName}</div>
          <div>{job.jobRole}</div>
          <div>{job.location}</div>
        </div>
      </div>

      <div>
        {job.salaryCurrencyCode} {job.minJdSalary} - {job.maxJdSalary}
      </div>
      <div className="desc">{job.jobDetailsFromCompany}</div>

      {job.minExp != null ? (
        <>
          <div class="left">Minimum Experience:</div>
          <div class="left">{job.minExp} years</div>
        </>
      ) : (
        <>
          <br></br>
          <br></br>
        </>
      )}
      <button class="apply">Easy Apply</button>
    </div>
  );
}
