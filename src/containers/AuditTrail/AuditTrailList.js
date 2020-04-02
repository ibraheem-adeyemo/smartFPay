import React, { useState, useEffect } from "react";
// import "../../../../src/assets/Styles/Dashboard.css";
// import { FilterSVG, ExportSVG} from "../../../assets/Svgs/Svgs";
// import { CSVLink } from "react-csv";
// import { shortMonthNames, shortDayNames } from "../../../lib/Components/DateNames";
// import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
// import Pagination from "../../../lib/Components/Pagination";



const AuditTrailList = (props) => {
//   const {oTrailReducer} = props;
//   const {data, count, status} = oTrailReducer.oTrail;
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;
//   useEffect(() => {
//     props.onFetchTrails(pageNo, pageSize);
//   }, [])

//   useEffect(() => {
//     setTotalPages(Math.ceil(count / pageSize));
//   })

const data= [
    {
        useremail: 'useremail@gmail.com',
        description: 'user-login',
        action: 'login',
        createdAt: '11-11-11'
    }
]


  const TrailList = data && data.map((value) => {
    const {id, description, useremail, action, createdAt} = value;
    const d = new Date(createdAt);
    return (
      <tr key={id}>
        <td className="table-description font-weight-bold">{useremail}</td>
        <td className="table-description">{description}</td>
        <td className="table-description">{action}</td>
        <td className="table-description">
          {createdAt}
        </td>
      </tr>
    )
  });
  return (
    <>
                {/* <SkeletonTheme color="#fff" highlightColor="#f4f4f4"> */}

    <div className="disbursed-cards-container row">
      <div className="menu-link" style={{marginBottom: 0, paddingBottom: 4}}>
        <span style={{color: "#000000", borderBottomColor: "#00425F", borderBottomWidth: 3, borderBottomStyle: "solid"}}>Audit Trail</span>
      </div>  
      {!!data && 
    //   <CSVLink data={data} filename={'Audit Trail.csv'} className="" target="_blank">
        <div className="disbursed-cards-export-btn" style={{float: "right"}}>
          <span className="text-white">Export CSV</span>
        </div> 
    //   </CSVLink>
      }
      <table className="table table-hover">
          <thead>
            <tr>
              <td>Email Address</td>
              <td>Description</td>
              <td>Actions</td>
              <td>Date</td>
            </tr>
          </thead>
          <tbody>
            {TrailList || <tr><td colSpan={4} className="text-center">No Audit Trail to show</td></tr>}
          </tbody>
      </table>
            {/* <Pagination count={count} pageSize={pageSize} fetchMethod={(pageNo, pageSize) => {
              props.onFetchTrails(pageNo, pageSize);
            }} /> */}
      
    </div>
    </>
  )
};

export default AuditTrailList;