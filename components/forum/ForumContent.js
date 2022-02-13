import React, { useEffect, useState } from "react";
import { forum_db } from "../../firebase/forumConfig";
import ForumContentCard from "./content/ForumContentCard";
import ForumContentModal from "./content/ForumContentModal";
import ForumContentPagination from "./content/ForumContentPagination";

const ForumContent = () => {
  const [interacted, setinteracted] = useState([]);
  const [posts, setposts] = useState();
  useEffect(() => {
    const query = forum_db
      .collection("posts")
      .orderBy("created_at", "desc")
      .limit(3)
      .onSnapshot(res => {
        setposts(res);
      });
    return query;
  }, []);
  useEffect(() => {
    if (!posts) return;
    forum_db
      .collection("users")
      .doc("bintang")
      .collection("post_interacted")
      .onSnapshot(res => {
        if (res.docs.length > 0) {
          var data = [];
          res.forEach(doc => {
            data.push(doc);
          });
          setinteracted(data);
        }
      });
  }, [posts]);

  const generateContent = () => {
    if (!posts) return;
    var data = [];
    posts.forEach(val => {
      data.push(
        <ForumContentCard
          postdata={val}
          interacted={interacted.filter(post => post.id === val.id)[0]}
          key={val.id}
        />
      );
    });
    return data;
  };

  return (
    <div className="flex flex-col h-full px-12 w-full max-w-4xl ml-auto break-words">
      {generateContent()}
      <ForumContentPagination />
    </div>
  );
};

export default ForumContent;
