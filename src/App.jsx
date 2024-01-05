import { useState, useEffect } from "react";
import axios from "axios";

import "./css/app.css";
import "./css/body.css";
import "./css/header.css";
import "./css/style.css";

import Header from "./Header.jsx";
import Feed from "./components/Feed.jsx";
import BottomTabs from "./components/BottomTabs.jsx";
import {
  ARCHIVE,
  ACTIVITY_FEED,
  API_ENDPOINT,
  UNARCHIVE,
  ARCHIVE_ALL,
  UNARCHIVE_ALL,
} from "./constants.js";

const App = () => {
  const [currentTab, setCurrentTab] = useState(ACTIVITY_FEED);
  const [activityFeedList, setActivityFeedList] = useState([]);
  const [archiveList, setArchiveList] = useState([]);

  const fetchCalls = () => {
    axios
      .get(`${API_ENDPOINT}/activities`)
      .then(({ data }) => {
        const tempActivityFeed = data.filter(
          (call) => call.from && !call.is_archived
        );
        const tempArchiveFeed = data.filter(
          (call) => call.from && call.is_archived
        );

        setActivityFeedList(tempActivityFeed);
        setArchiveList(tempArchiveFeed);
      })
      .catch((error) => console.log(error.message));
  };

  const sendToArchive = (id) => {
    axios
      .patch(`${API_ENDPOINT}/activities/${id}`, { is_archived: true })
      .then(() => {
        let tempCall = null;
        const tempArchiveFeed = [];
        const tempActivityFeed = [];

        for (let call of archiveList) {
          tempArchiveFeed.push(call);
        }

        for (let call of activityFeedList) {
          if (call.id !== id) tempActivityFeed.push(call);
          else tempCall = call;
        }

        tempArchiveFeed.push(tempCall);

        setActivityFeedList(tempActivityFeed);
        setArchiveList(tempArchiveFeed);
      });
  };

  const sendToActivityFeed = (id) => {
    axios
      .patch(`${API_ENDPOINT}/activities/${id}`, { is_archived: false })
      .then(() => {
        let tempCall = null;
        const tempArchiveFeed = [];
        const tempActivityFeed = [];

        for (let call of archiveList) {
          if (call.id !== id) tempArchiveFeed.push(call);
          else tempCall = call;
        }

        for (let call of activityFeedList) {
          tempActivityFeed.push(call);
        }

        tempActivityFeed.push(tempCall);

        setActivityFeedList(tempActivityFeed);
        setArchiveList(tempArchiveFeed);
      });
  };

  const archiveAll = () => {
    const requests = activityFeedList.map((call) => {
      return axios.patch(`${API_ENDPOINT}/activities/${call.id}`, {
        is_archived: true,
      });
    });

    axios.all(requests).then(() => {
      const tempArchiveFeed = [];
      const tempActivityFeed = [];

      for (let call of archiveList) {
        tempArchiveFeed.push(call);
      }

      for (let call of activityFeedList) {
        tempArchiveFeed.push(call);
      }

      setActivityFeedList(tempActivityFeed);
      setArchiveList(tempArchiveFeed);
    });
  };

  const unarchiveAll = () => {
    axios.patch(`${API_ENDPOINT}/reset`).then(() => {
      const tempArchiveFeed = [];
      const tempActivityFeed = [];

      for (let call of archiveList) {
        tempActivityFeed.push(call);
      }

      for (let call of activityFeedList) {
        tempActivityFeed.push(call);
      }

      setActivityFeedList(tempActivityFeed);
      setArchiveList(tempArchiveFeed);
    });
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <div className="container">
      <Header />
      {currentTab === ACTIVITY_FEED && (
        <Feed
          feedList={activityFeedList}
          heading={ACTIVITY_FEED}
          fn={sendToArchive}
          labelText={ARCHIVE}
          topMenuLabel={ARCHIVE_ALL}
          topMenuFn={archiveAll}
        />
      )}
      {currentTab === ARCHIVE && (
        <Feed
          feedList={archiveList}
          heading={ARCHIVE}
          fn={sendToActivityFeed}
          labelText={UNARCHIVE}
          topMenuLabel={UNARCHIVE_ALL}
          topMenuFn={unarchiveAll}
        />
      )}
      <BottomTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
};

export default App;
