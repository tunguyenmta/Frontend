import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TestUser.css";
function TestUser() {
  const [imgData, setImgData] = useState("");
  useEffect(() => {
    let response;
    async function getImage() {
      response = await axios
        .get("http://localhost:5000/api/user/64216384d5561c4d7351f4fc")
        .then((res) => {
          const blob = new Blob(
            [Int8Array.from(res.data.userImage.data.data)],
            { type: res.data.userImage.data.contentType }
          );
          // console.log(res.data.userImage.data.data);
          const img = window.URL.createObjectURL(blob);
          setImgData(img);
          // setImgData(res.data.userImage.data.data.toString("base64"));
        })
        .catch((err) => console.error(err));
      return response;
    }
    getImage();
  }, []);
  return (
    <div style={{ width: "200px", height: "100px" }}>
      <img style={{ width: "100%", height: "100%" }} src={imgData} alt="" />
    </div>
  );
}

export default TestUser;
