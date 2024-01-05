import React, { useState } from "react";
import CallContainer from "./CallContainer.jsx";
import { DetailSection } from "./DetailSection.jsx";
import axios from "axios";
import { API_ENDPOINT } from "../constants.js";

const Feed = ({
  feedList,
  heading,
  fn,
  labelText,
  topMenuLabel,
  topMenuFn,
}) => {
  const [callDetail, setCallDetail] = useState({});
  const [showDetail, setShowDetail] = useState(false);

  const fetchCallDetail = (id) => {
    axios.get(`${API_ENDPOINT}/activities/${id}`).then(({ data }) => {
      setCallDetail(data);
      setShowDetail(true);
    });
  };

  return (
    <section className="feed">
      <DetailSection
        callDetail={callDetail}
        showDetail={showDetail}
        setShowDetail={setShowDetail}
      />
      <div className={`top-section ${showDetail ? "active" : ""}`}>
        <div className="page-heading">{heading}</div>
        <div className="top-menu-option" onClick={topMenuFn}>
          {topMenuLabel}
        </div>
      </div>
      <div className={`call-list ${showDetail ? "active" : ""}`}>
        {feedList.map((call) => (
          <CallContainer
            key={call.id}
            call={call}
            fn={fn}
            labelText={labelText}
            fetchCallDetail={fetchCallDetail}
          />
        ))}
      </div>
    </section>
  );
};

export default Feed;
