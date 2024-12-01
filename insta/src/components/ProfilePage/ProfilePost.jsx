import React, { useState } from "react";

import Modal from "../Modal/Modal";

function ProfilePost({ post }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsOpenModal(true)}
        className="rounded-sm cursor-pointer overflow-hidden relative "
      >
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300">
          <div className="absolute flex items-center gap-24 justify-center inset-0"></div>
        </div>
        <img className="w-[100%]  h-[100%] object-cover" src={post?.imageURL} />
      </div>
      {isOpenModal && <Modal post={post} setIsOpenModal={setIsOpenModal} />}
    </>
  );
}

export default ProfilePost;
