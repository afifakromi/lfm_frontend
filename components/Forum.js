import React, { useEffect, useState } from "react";
import ForumContent from "./forum/ForumContent";
import ForumLeftBar from "./forum/ForumLeftBar";
import ForumRightBar from "./forum/ForumRightBar";

const Forum = () => {
  return (
    <div
      className="flex justify-between bg-customGreyForum bg-no-repeat py-20 px-10 relative h-full bg-center min-h-screen"
      style={{
        backgroundImage: "url('/img/illustration.png')",
        backgroundSize: "70rem",
        // backgroundPosition: "50% 50%",
        backgroundOrigin: "border-box",
      }}
    >
      {/* <ForumLeftBar /> */}
      <ForumContent />
      <ForumRightBar />
    </div>
  );
};

export default Forum;
