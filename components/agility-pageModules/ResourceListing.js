import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./cssModules/resourcelisting.module.css";

const ResourceListing = ({ module, customData }) => {
  console.log("Resources:",customData);
  console.log(module);
  
  const  {resources,categories} = customData;
  console.log('categories: ', categories);

  if (resources.length <= 0) {
    return (
      <div className="mt-44 px-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl text-center font-bold">No posts available.</h1>
        <div className="my-10">
          <Link href="/home">
            <a className="px-4 py-3 my-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-primary-700 focus:shadow-outline-primary transition duration-300">
              Return Home
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-8 mb-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="sm:grid sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => (
              <Link href={resource.slug} key={index}>
                  <div className={`${styles.resourceCard} max-w-xs rounded overflow-hidden shadow-lg my-2 resource-card`}>
                    <div className={styles.cardImageWrapper} style={{ background: `url(${resource.thumbnail.url})` }}></div>
                    <div className="px-6 py-4">
                      <div className="uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose">
                        {resource.category}
                      </div>
                      <div className="font-bold text-xl mb-2">{resource.title}</div>
                    </div>
                  </div>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// function to resole post urls
const resolvePostUrls = function (sitemap, posts) {
    let dynamicUrls = {};
    posts.forEach((post) => {
        Object.keys(sitemap).forEach((path) => {
        if (sitemap[path].contentID === post.contentID) {
            dynamicUrls[post.contentID] = path;
        }
        });
    });
    return dynamicUrls;
};

ResourceListing.getCustomInitialProps = async ({
    agility,
    channelName,
    languageCode,
}) => {
    const api = agility;

    try {

        // get sitemap...
        let sitemap = await api.getSitemap({
            channelName: channelName,
            languageCode,
        });

        let rawResources = await api.getContentList({
            referenceName: 'resourceposts',
            languageCode
        });

        // get categories...
        let resourceTypes = await api.getContentList({
            referenceName: "resourcetypes",
            languageCode,
        });

        console.log('Resourcs:',rawResources);

        console.log(resourceTypes);

        // resolve dynamic urls
        const dynamicUrls = resolvePostUrls(sitemap, rawResources);

        const resources = rawResources.map((resource) => {
            const title = resource.fields.title;
            const slug = dynamicUrls[resource.contentID] || "#";
            const thumbnail = resource.fields.thumbnail;
            
            // categoryID
            const categoryID = resource.fields.category?.contentid;

            // find category
            const category = resourceTypes?.find((c) => c.contentID == categoryID);

            return {
                title,
                slug,
                thumbnail,
                category : category.fields.title
            };
        });

        const categories = resourceTypes.map((type) => {
          const title = type.fields.title;

          return {
            title
          }
        });

        return {
            resources,
            categories
        };
    } catch (error) {
        if (console) console.error(error);
    }
};

export default ResourceListing;
