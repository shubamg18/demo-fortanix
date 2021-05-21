import React from "react";
import { renderHTML } from "@agility/nextjs";
import Image from "next/image";

const ResourceDetails = ({ dynamicPageItem }) => {

    console.log(dynamicPageItem);

  return (
    <div className="relative px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="h-64 md:h-96 relative">
          Testing
        </div>
      </div>
    </div>
  );
};

export default ResourceDetails;
