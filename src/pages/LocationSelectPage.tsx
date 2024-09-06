import React from "react";
import { Card, Carousel, Layout } from "antd";
import Title from "antd/es/typography/Title";

import LocationCard from "../components/Location/LocationCard";

import * as I from "../assets/random/image";
import { ReactComponent as Mylogo } from "../assets/images/mylogo.svg";
import { ReactComponent as Mytextlogo } from "../assets/images/mytextlogo.svg";
import { Color } from "antd/es/color-picker";

const LocationContainer: React.FC = () => {
  const locations = [
    {
      locationName: "성수",
      imageUrl: I.randomImage(800, 600),
      linkUrl: "/course?value=seongsu",
    },
    {
      locationName: "홍대",
      imageUrl: I.randomImage(800, 600),
      linkUrl: "/course?value=hongdae",
    },
    {
      locationName: "강남",
      imageUrl: I.randomImage(800, 600),
      linkUrl: "/course?value=gangnam",
    },
    {
      locationName: "신촌",
      imageUrl: I.randomImage(800, 600),
      linkUrl: "/course?value=sinchon",
    },
    {
      locationName: "건대",
      imageUrl: I.randomImage(800, 600),
      linkUrl: "/course?value=konkuk",
    },
  ];

  return (
    <>
      <Layout
        style={{
          position: "relative",
          top: "10px",
          width: "100%",
          padding: "0px auto",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "transparent",
          color: "##6f0f",
        }}
      >
        <Mylogo style={{ width: "100%", height: "160px", color: "##6f0f" }} />
      </Layout>
      <Layout
        style={{
          position: "relative",
          top: "0px",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "78.25px",
          backgroundColor: "transparent",
        }}
      >
        {/* <Title style={{display: "flex", width: "100%", padding: "0px 81px", justifyContent: "center", alignItems: "center", gap: "10px"}} >DATEPEEK</Title> */}
        <Mytextlogo style={{ height: "100%", flexShrink: "0" }} />
      </Layout>
      <Layout
        style={{
          position: "relative",
          top: "0px",
          display: "flex",
          width: "100%",
          padding: "17px 42px",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "transparent",
        }}
      >
        <Title
          style={{
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "700",
            letterSpacing: "-0.48px",
            color: "#ff6f0f",
          }}
        >
          요즘 핫한 데이트 장소는?
        </Title>
      </Layout>
      {/* @TODO: 화살표 색상 입혀서 만들기 */}
      <Carousel
        autoplay
        vertical
        autoplaySpeed={5000}
        style={{ position: "relative", top: "0px", height: "160px" }}
        arrows={true}
      >
        {locations.map((location, index) => (
          <LocationCard
            imageUrl={location.imageUrl}
            locationName={location.locationName}
            linkUrl={location.linkUrl}
          />
        ))}
      </Carousel>
    </>
  );
};
export default LocationContainer;
