import React, { useState } from "react";
import {
  Card as AntCard,
  Avatar,
  Tag,
  Space,
  Rate,
  Typography,
  Divider,
} from "antd";
import { StarFilled } from "@ant-design/icons";
import { CourseSummary } from "../../types";

const { Text } = Typography;

interface CardProps {
  title: string;
  userName: string;
  tags: string[];
  imageUrl: string;
  time: number;
  comments: number;
  likes: number;
  meanrating: number;
  ratingCount: number;
}

const CourseCard: React.FC<CourseSummary> = ({
  id,
  title,
  userName,
  tags,
  imageUrl,
  meanrating,
}) => {
  return (
    <AntCard
      hoverable
      style={{ width: "100%", marginBottom: 16, borderRadius: 16 }}
      bodyStyle={{ padding: "20px" }}
    >
      <AntCard.Meta
        avatar={<Avatar shape="square" size={120} src={imageUrl} />}
        title={title}
        description={
          <div>
            <div>{userName}</div>
            {tags.map((tag) => (
              <Tag style={{ marginTop: 8 }}>{tag}</Tag>
            ))}
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <Text style={{ marginLeft: 8 }}>({meanrating.toFixed(1)})</Text>
              <StarFilled
                style={{
                  fontSize: "24px",
                  color: "#fadb14",
                  marginRight: "8px",
                }}
              />
            </div>
          </div>
        }
      />
    </AntCard>
  );
};

export default CourseCard;
