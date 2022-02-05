import React from "react";
import TimelineItem from "./TimelineItem";

const Timeline = () => {
  return (
    <div className="bg-nav w-full py-10 flex flex-col items-center justify-center">
      <p className="text-6xl text-customCrem font-montserrat text-center mb-16">
        Ganffest 2022 <br /> Main Event Timeline
      </p>

      <TimelineItem
        date="14 Januari"
        className="right-20"
        bgColor="#2641A1"
        isTop={false}
        rounded="rounded-t-2xl"
        content="
        <pre>
        19.00 - 19.10   Open gate <br/>
        19.10 - 20.00   Opening ganffest 2022 <br/>
        20.00 - 20.40   Pemutaran <br/> </pre>"
      />
      <TimelineItem
        date="15 Januari"
        className="left-20"
        bgColor="#48449A"
        content="
        <pre>
        10.00 - 11.30   Program Anatomy of Feelings <br/>
        13.00 - 14.30   Program Disfigured Hearts <br/>
        16.00 - 17.30   Program Collab <br/>
        19.00 - 20.30   Program Yogi <br/>
        20.30 - 21.00   Diskusi Yogi <br/> </pre>"
      />
      <TimelineItem
        date="16 Januari"
        className="right-20"
        bgColor="#6A4995"
        content="
        <pre>
        10.00 - 11.30   Program Disfigured Hearts <br/>
        13.00 - 14.30   Program Collab <br/>
        16.00 - 17.30   Program Yogi <br/>
        19.00 - 20.30   Program Anatomy of Feelings <br/>
        20.30 - 21.00   Diskusi Allaam <br/> </pre>"
      />
      <TimelineItem
        date="17 Januari"
        className="left-20"
        bgColor="#8E4F90"
        content="
        <pre>
        10.00 - 11.30   Program Collab <br/>
        13.00 - 14.30   Program Yogi <br/>
        16.00 - 17.30   Program Anatomy of Feelings <br/>
        19.00 - 20.30   Program Disfigured Hearts <br/>
        20.30 - 21.00   Diskusi Thya <br/> </pre>"
      />
      <TimelineItem
        date="18 Januari"
        className="right-20"
        bgColor="#B3548A"
        content="
        <pre>
        10.00 - 11.30   Program Yogi <br/>
        13.00 - 14.30   Program Anatomy of Feelings <br/>
        16.00 - 17.30   Program Disfigured Hearts <br/>
        19.00 - 20.30   Program Collab <br/> </pre>"
      />
      <TimelineItem
        date="19 Januari"
        className="left-20"
        bgColor="#E15A82"
        content="
        <pre>
        12.45 - 13.15   Open gate <br/>
        13.25 - 15.05   Program Bandung Nu Aing <br/>
        15.35 - 17.40   Program Kompetisi <br/> </pre>"
      />
      <TimelineItem
        date="20 Januari"
        className="right-20"
        bgColor="#FE6C79"
        isBottom={true}
        rounded="rounded-b-2xl"
        content="
        <pre>
        11.55 - 12.10   Open gate <br/>
        12.20 - 13.50   Program Horizon <br/>
        16.00 - 17.30   Program Collab <br/>
        17.35 - 17.50   Awarding Night <br/> </pre>"
      />
    </div>
  );
};

export default Timeline;