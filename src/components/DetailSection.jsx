import React from "react";

export const DetailSection = ({ callDetail, showDetail, setShowDetail }) => {
  return (
    <div className={`detail-section ${showDetail ? "active" : ""}`}>
      <div className="call-detail">
        <div className="detail-top-section">
          <h1 className="page-heading">Call Details</h1>
          <div className="cross" onClick={() => setShowDetail(false)}>
            <div className="cross-line first" />
            <div className="cross-line second" />
          </div>
        </div>
        <ul>
          <li>
            <span className="detail-label">Call Type:</span>
            {callDetail.call_type}
          </li>
          <li>
            <span className="detail-label">Created At:</span>
            {new Date(callDetail.created_at).toLocaleDateString()}
          </li>
          <li>
            <span className="detail-label">Duration:</span>
            {callDetail.duration}s
          </li>
          <li>
            <span className="detail-label">From:</span> {callDetail.from}
          </li>
          <li>
            <span className="detail-label">To:</span> {callDetail.to}
          </li>
          <li>
            <span className="detail-label">Via:</span> {callDetail.via}
          </li>
        </ul>
      </div>
    </div>
  );
};
