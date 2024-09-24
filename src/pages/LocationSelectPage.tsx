import React, { useRef } from "react";
import "../App.css"; // 스타일 파일 import
import { Carousel, Layout } from "antd";
import { CarouselRef } from "antd/es/carousel";
import Title from "antd/es/typography/Title";
import LocationCard from "../components/Location/LocationCard";
import * as I from "../assets/random/image";
import { ReactComponent as Mylogo } from "../assets/images/mylogo.svg";
import { ReactComponent as Mytextlogo } from "../assets/images/mytextlogo.svg";
import RightArrowIcon from "../assets/images/RightArrowIcon.png";
import LeftArrowIcon from "../assets/images/LeftArrowIcon.png";

const LocationContainer: React.FC = () => {
  const locations = [
    {
      id: 1,
      locationName: "성수",
      imageUrl: I.randomImage(800, 600),
      linkUrl: "/course?value=1",
    },
    {
      id: 2,
      locationName: "홍대",
      imageUrl: I.randomImage(800, 600),
      linkUrl: "/course?value=2",
    },
    {
      id: 3,
      locationName: "합정",
      imageUrl: I.randomImage(800, 600),
      linkUrl: "/course?value=3",
    },
    {
      id: 4,
      locationName: "강남",
      imageUrl: I.randomImage(800, 600),
      linkUrl: "/course?value=4",
    },
    {
      id: 5,
      locationName: "신촌",
      imageUrl: I.randomImage(800, 600),
      linkUrl: "/course?value=5",
    },
    {
      Id: 6,
      locationName: "건대",
      imageUrl: I.randomImage(800, 600),
      linkUrl: "/course?value=6",
    },
  ];

  // Carousel 레퍼런스를 위한 Ref 생성
  const carouselRef = useRef<CarouselRef | null>(null);

  // 화살표 클릭 이벤트 핸들러
  const handlePrevClick = () => {
    carouselRef.current?.prev();
  };

  const handleNextClick = () => {
    carouselRef.current?.next();
  };

  return (
    <>
      <Layout
        style={{
          position: "relative",
          top: "150px",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Mylogo style={{ width: "90%", height: "100px" }} />
      </Layout>

      <Layout
        style={{
          position: "relative",
          top: "150px",
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
          top: "150px",
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
            fontSize: "28px",
            fontWeight: "700",
            letterSpacing: "-0.48px",
            color: "#ff6f0f",
          }}
        >
          요즘 핫한 데이트 장소는?
        </Title>
      </Layout>

      <div
        style={{
          position: "relative",
          top: "150px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 왼쪽 화살표 */}
        <img
          src={LeftArrowIcon}
          alt="left-arrow"
          style={{
            color: "#000",
            position: "absolute",
            top: "50%",
            left: "80px",
            zIndex: 2,
            cursor: "pointer",
            width: "24px",
            height: "24px",
          }}
          onClick={handlePrevClick}
        />
        {/* 캐러셀 */}
        <Carousel
          ref={carouselRef} // Carousel에 Ref 연결, 타입 명시됨
          autoplay
          autoplaySpeed={5000}
          dots={false}
          style={{ height: "150px" }}
        >
          {locations.map((location, index) => (
            <LocationCard
              key={index}
              imageUrl={location.imageUrl}
              locationName={location.locationName}
              linkUrl={location.linkUrl}
              cardstyle={{
                boxShadow: "none", // 하단 그림자 제거
              }}
            />
          ))}
        </Carousel>

        {/* 오른쪽 화살표 */}
        <img
          src={RightArrowIcon} // 주어진 아이콘 사용
          alt="right-arrow"
          style={{
            color: "#000",
            position: "absolute",
            top: "50%",
            right: "80px",
            zIndex: 2,
            cursor: "pointer",
            width: "24px",
            height: "24px",
          }}
          onClick={handleNextClick} // 다음 슬라이드로 이동
        />
      </div>
    </>
  );
};

export default LocationContainer;
