import React from "react";
import { useState, useEffect } from "react";
import "./style.css"; // import the CSS file

// const URL = "https://api.cricapi.com/v1/currentMatches?apikey=b66e6067-cbba-4d96-b5a5-2ae7f4284380&offset=0";
// const URL="https://api.cricapi.com/v1/currentMatches?apikey=5e0e40a6-0a8a-465f-84ee-3cf6b1acb6cf&offset=0";
// const URL ="https://api.cricapi.com/v1/currentMatches?apikey=ea226414-35db-475f-ab85-df591c2c5477&offset=0";
const URL="https://api.cricapi.com/v1/currentMatches?apikey=de2457e0-13cb-47f0-a095-7f37de1079b4&offset=0";

//   "https://api.cricapi.com/v1/currentMatches?apikey=c18aa245-6e50-4f19-afcc-841441e65606&offset=0";

function Home() {
  const [data, setData] = useState([]);
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(URL);
      const json = await response.json();
      console.log(json.data);
      setData(json.data);
    }
     
    fetchData();
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let day = date.getDate();
    if (day < 10) day = "0" + day;
    const formattedDate = `${year}-${month}-${day}`;
    setTodayDate(formattedDate);
  }, []);

  return (
    <>
      <div>
        <b>Live Scores</b>
        {data.map((match) =>
          match.matchStarted && match.date === todayDate ? (
            <div key={match.id} id="live" >
              <div id="block0">
                {match.date} {match.status} {match.matchType!==undefined?match.matchType:''}
              </div>
              <div id="block1">
                <img
                  src={match.teamInfo[0].img}
                  width="25px"
                  height="25px"
                  alt={match.teamInfo[0].name}
                />
                <span id="name">{match.teamInfo[0].name}</span>
                <span id="score">{match.score && match.score[0] && match.score[0].r !== undefined ? match.score[0].r+'-'+match.score[0].w +'('+match.score[0].o+')': 0}</span>
              </div>

              <div style={{ lineHeight: 4 }}></div>

              <div id="block2">
                <img
                  src={match.teamInfo[1].img}
                  width="25px"
                  height="25px"
                  alt={match.teamInfo[1].name}
                />
                <span id="name">{match.teamInfo[1].name}</span>
                <span id="score">{match.score && match.score[1] && match.score[1].r !== undefined ? match.score[1].r+'-'+match.score[1].w +'('+match.score[1].o+')': 0}</span>
             
                
              </div>
            </div>
          ) : null
        )}
        <b>Recent matches</b>
        {data.map((match) =>
          !match.matchEnded && match.date === todayDate ? null : (
            <div key={match.id} id="live">
              <div id="block0">
                <div className="container">
                <span className="date">{match.date}</span><span className="status">{match.status}</span>  <span className="type">{match.matchType!==undefined?match.matchType:''}</span>
                </div>
                
              </div>
              <div id="block1">
                <img
                  src={match.teamInfo[0].img}
                  width="25px"
                  height="20px"
                  alt={match.teamInfo[0].name}
                />
                <span id="name">{match.teamInfo[0].name}</span>
                <span id="score">{match.score && match.score[0] && match.score[0].r !== undefined ? match.score[0].r+'-'+match.score[0].w +'('+match.score[0].o+')': 0}</span>
              </div>
              <div id="block2">
                <img
                  src={match.teamInfo[1].img}
                  width="25px"
                  height="25px"
                  alt={match.teamInfo[1].name}
                />
                <span id="name">{match.teamInfo[1].name}</span>
                <span id="score">{match.score && match.score[1] && match.score[1].r !== undefined ? match.score[1].r+'-'+match.score[1].w +'('+match.score[1].o+')': 0}</span>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Home;
