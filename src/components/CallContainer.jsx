import React from "react";
import Menu from "./Menu.jsx";
import { ARCHIVE } from "../constants.js";

const CallContainer = ({ call, fn, labelText, fetchCallDetail }) => {
  return (
    <div className="call-container">
      <div className="call-detail">
        <div className="caller-number">{call.from}</div>
        <div className="call-type-direction">
          <div className="call-direction">{call.direction}</div>
          <div className={`call-type ${call.call_type}`}>{call.call_type}</div>
          <div>{new Date(call.created_at).toLocaleString()}</div>
        </div>
      </div>
      <Menu
        fn={fn}
        id={call.id}
        labelText={labelText}
        fetchCallDetail={fetchCallDetail}
      />
    </div>
  );
};

export default CallContainer;
