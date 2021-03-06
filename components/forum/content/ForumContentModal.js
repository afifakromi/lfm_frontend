import React, { useEffect, useState } from "react";
import { forum_db } from "../../../firebase/forumConfig";
import ForumComment from "./ForumComment";
import ForumReply from "./ForumReply";
import LikeButton from "../commons/LikeButton";
import DislikeButton from "../commons/DislikeButton";
import ForumMedia from "./ForumMedia";
import { getUsername } from "../../../authentication/utils";

const ForumContentModal = ({
  togglemodal,
  settogglemodal,
  postdata,
  liked,

  // setpostdata,
}) => {
  const [comments, setcomments] = useState();
  const [commentsViewed, setcommentsViewed] = useState(3);
  const [isEndComment, setisEndComment] = useState(false);
  // const [lastVisible, setlastVisible] = useState();
  const [commentInteracted, setcommentInteracted] = useState([]);

  useEffect(() => {
    if (postdata) {
      // console.log(postdata.id);
      forum_db
        .collection("posts")
        .doc(postdata.id)
        .collection("comments")
        .orderBy("created_at", "asc")
        .onSnapshot(res => {
          var data = [];
          res.forEach(doc => {
            data.push(doc);
          });
          if (isEndComment) {
            setcommentsViewed(data.length);
          }
          if (data.length <= 3) {
            setisEndComment(true);
          }
          setcomments(data);
        });
    }
  }, [postdata]);

  useEffect(() => {
    if (!postdata) return;
    forum_db
      .collection("users")
      .doc(getUsername())
      .collection("post_interacted")
      .doc(postdata.id)
      .collection("comment_interacted")
      .onSnapshot(res => {
        if (res.docs.length > 0) {
          var data = [];
          res.forEach(doc => {
            // console.log(doc.data());
            data.push(doc);
          });
          setcommentInteracted(data);
        }
      });
  }, [postdata]);

  useEffect(() => {
    if (togglemodal) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [togglemodal]);
  // console.log("a");

  const toggleLoadComments = n_comment => {
    if (comments?.length > 0) {
      return comments.slice(0, n_comment).map((doc, idx) => {
        // console.log(doc.data());
        return (
          <ForumComment
            postdata={postdata}
            commentdata={doc}
            key={idx}
            commentInteracted={
              commentInteracted.filter(comment => comment.id === doc.id)[0]
            }
          />
        );
      });
    } else {
      if (isEndComment) {
        return <p className="text-center mb-3">no comment yet</p>;
      }
      return <p className="text-center mb-3">...</p>;
    }
  };
  const loadMoreComments = () => {
    if (commentsViewed < comments?.length) {
      if (commentsViewed + 3 >= comments.length) {
        setisEndComment(true);
      }
      setcommentsViewed(commentsViewed + 3);
    }
    // if (!lastVisible) return;
    // forum_db
    //   .collection("posts")
    //   .doc(postdata.id)
    //   .collection("comments")
    //   .orderBy("created_at", "asc")
    //   .startAfter(lastVisible)
    //   .limit(3)
    //   .onSnapshot(res => {
    //     if (res.docs.length == 0) {
    //       setisEndComment(true);
    //     } else {
    //       var data = [];
    //       res.forEach(doc => {
    //         data.push(doc);
    //       });
    //       // console.log(data);
    //       setcomments(prevComments => [...prevComments, ...data]);
    //       setlastVisible(res.docs[res.docs.length - 1]);
    //     }
    //   });
  };

  return (
    <>
      <div
        style={{ backgroundColor: "rgba(209, 213, 219, .75 )" }}
        className={
          (togglemodal ? "visible " : "hidden ") +
          "fixed w-full h-full top-0 left-0 py-20 overflow-y-auto z-50"
        }
        data-modal
        onClick={e => {
          e.preventDefault();
          if (e.target.dataset.modal) {
            settogglemodal();
          }
        }}
      >
        <div
          className={
            (togglemodal && postdata ? "visible " : "hidden ") +
            "flex p-8 rounded-xl mx-auto xl:w-1/2 md:w-3/5 max-w-4xl sm:w-3/4 bg-white shadow-lg"
          }
        >
          {postdata ? (
            <>
              <div className="flex flex-col mr-9 items-center">
                <LikeButton sourcedata={postdata} liked={liked} />
                <p className="my-3 text-center">
                  {postdata.data().liked - postdata.data().disliked}
                </p>
                <DislikeButton sourcedata={postdata} liked={liked} />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex items-center w-full mb-1">
                  <p className="text-black text-xl font-bold mr-auto">
                    {postdata.data().topic}
                  </p>
                  <img src="/img/pp.png" alt="" className="mr-1" />
                </div>

                <p className="text-black text-sm font-gilroy my-3">
                  {postdata.data().description}
                </p>
                <ForumMedia media={postdata} />
                <div className="flex flex-col w-full h-full py-4 border-t-2 border-gray-200">
                  <div
                    className="flex flex-col w-full overflow-y-auto"
                    // style={{ maxHeight: "38rem" }}
                  >
                    {comments && commentsViewed === 0
                      ? toggleLoadComments(3)
                      : toggleLoadComments(commentsViewed)}
                    {isEndComment ? (
                      ""
                    ) : (
                      <button
                        className=" text-customBlueForum mb-2"
                        onClick={e => {
                          e.preventDefault();
                          loadMoreComments();
                        }}
                      >
                        load more...
                      </button>
                    )}
                  </div>
                  <div className="w-full border-t-2 border-gray-200"></div>
                  <ForumReply postdata={postdata} />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ForumContentModal;
