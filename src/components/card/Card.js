import "./Card.css";

export default function Card({ job }) {
  return (
    <div className="card">
      <div className="top">
        <img src={job.logoUrl} alt="Company Logo" className="logo"></img>
        <div className="info">
          <div className="company">{job.companyName}</div>
          <div className="top-container">
            <div className="top-details">{job.jobRole}</div>
            <div className="top-details">{job.location}</div>
          </div>
        </div>
      </div>

      <span>Estimated Salary: </span>
      <span>
        {job.salaryCurrencyCode} {job.minJdSalary} - {job.maxJdSalary}
      </span>

      <div className="desc">{job.jobDetailsFromCompany}</div>

      {job.minExp != null ? (
        <>
          <div className="exp">Minimum Experience:</div>
          <div className="exp">{job.minExp} years</div>
        </>
      ) : (
        <>
          <br></br>
          <br></br>
        </>
      )}
      <button className="apply">⚡ Easy Apply</button>
    </div>
  );
}
