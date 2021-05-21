import React from "react";
import Image from "next/image";
import styles from "./cssModules/herobanner.module.css";

const HeroBanner = ({ module }) => {
  // get module fields
  const { fields } = module; 

  const bgUrl = fields.backgroundImage.url;

  return (
      <div className={styles.heroBanner} style={{ background: `url(${bgUrl})` }}>
          <div className="container mx-auto flex flex-col md:flex-row px-4">
              <div className="md:w-6/12">
                  <h1 className={styles.heroBannerHeading}>{ fields.title }</h1>
                  <p className={styles.heroBannerDescription}>{ fields.description }</p>
                  <a className={styles.heroBannerCTA} href={fields.cTA.href} target={fields.cTA.target}>{fields.cTA.text}</a>
              </div>
              <div className="md:w-6/12 flex justify-center">
                <img
                    src={fields.bannerImage.url}
                    alt={fields.bannerImage.label}
                    height={fields.bannerImage.pixelHeight/2}
                    width={fields.bannerImage.pixelWidth/2}
                />
              </div>
          </div>
      </div>
  );
};

export default HeroBanner;
