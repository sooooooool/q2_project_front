import React, { useState } from "react";
import { Card as AntCard, Avatar, Typography } from "antd";
import CustomLink from "../Common/Link";

const { Title, Text } = Typography;

interface LocationCardProps {
  locationName: string;
  imageUrl: string;
  linkUrl: string;
  style?: React.CSSProperties;
  cardstyle?: React.CSSProperties;
}

const LocationCard: React.FC<LocationCardProps> = ({
  locationName,
  imageUrl,
  linkUrl,
  cardstyle,
}) => {
  return (
    <>
      <CustomLink
        to={linkUrl}
        style={{
          display: "block",
          width: "100%",
          height: "160px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "10px 50px",
          margin: "",
        }}
        icon={
          <AntCard
            hoverable
            style={{
              width: "100%",
              height: "140px",
              marginBottom: 8,
              borderRadius: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              ...cardstyle,
            }}
          >
            <Title
              level={1}
              style={{
                fontSize: "48px",
                fontWeight: "700",
                fontStyle: "normal",
                color: "#ff6f0f",
                justifyContent: "center",
                alignItems: "center",
                margin: 0,
              }}
            >
              {locationName}
            </Title>
          </AntCard>
        }
      />
    </>
  );
};

export default LocationCard;
