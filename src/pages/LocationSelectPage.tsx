import React from "react";
import "../App.css"; // 스타일 파일 import
import { Card, Carousel, Layout } from "antd";
import Title from "antd/es/typography/Title";
import LocationCard from "../components/Location/LocationCard";
import * as I from "../assets/random/image";
import { ReactComponent as Mylogo } from "../assets/images/mylogo.svg";
import { ReactComponent as Mytextlogo } from "../assets/images/mytextlogo.svg";

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
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Mylogo style={{ width: "100%", height: "160px" }} />
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
          backgroundColor: "transparent",
        }}
      >
        <Title
          style={{
            fontSize: "24px",
            fontWeight: "700",
            letterSpacing: "-0.48px",
            color: "#ff6f0f",
          }}
        >
          요즘 핫한 데이트 장소는?
        </Title>
      </Layout>

      <Carousel
        autoplay
        vertical
        autoplaySpeed={5000}
        arrows={true}
        style={{ position: "relative", top: "0px", height: "160px" }}
      >
        {locations.map((location, index) => (
          <LocationCard
            key={index}
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
