import React from "react";
import { ACTIVITY_FEED, ARCHIVE } from "../constants";

const BottomTabs = ({ currentTab, setCurrentTab }) => {
  const toggleTab = (event) => {
    const { id } = event.target.dataset;

    if (id === ACTIVITY_FEED) setCurrentTab(ACTIVITY_FEED);
    else if (id === ARCHIVE) setCurrentTab(ARCHIVE);
  };

  return (
    <div className="bottom-tabs" onClick={toggleTab}>
      <div
        className={`tab ${currentTab === ACTIVITY_FEED ? "selected" : ""}`}
        data-id={ACTIVITY_FEED}
      >
        {ACTIVITY_FEED}
      </div>
      <div
        className={`tab ${currentTab === ARCHIVE ? "selected" : ""}`}
        data-id={ARCHIVE}
      >
        {ARCHIVE}
      </div>
    </div>
  );
};

export default BottomTabs;
