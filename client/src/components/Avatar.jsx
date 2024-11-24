import React from "react";

const Avatar = ({ companyName }) => {
  const getFirstLetter = () => {
    const name = companyName?.trim()[0];
    return name;
  };
  return (
    <div className="self-start h-14 w-14 bg-light text-primary flex items-center justify-center rounded-full shadow-sm">
      {getFirstLetter()}
    </div>
  );
};

export default Avatar;
