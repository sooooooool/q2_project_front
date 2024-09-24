import React from "react";
import { Form, Input } from "antd";
import * as T from "../../types";

const StackSelectField: React.FC<{
  index: number;
  showModal: () => void;
  selectedSpot?: T.DataItem;
}> = ({ index, showModal, selectedSpot }) => (
  <Form.Item
    key={index}
    name={`stack-${index}`}
    label={index === 0 ? "관련 스팟" : ""}
    rules={[
      {
        required: index < 2 ? true : false,
        message: "관련 스팟을 선택하세요.",
      },
    ]}
  >
    <Input
      placeholder="다녀온 핫플을 선택하세요."
      value={selectedSpot ? selectedSpot.Spot_Name : ""}
      onClick={showModal}
      style={{
        backgroundColor: "#f7f7f7",
        borderRadius: "10px",
        border: "1px solid #e0e0e0",
        padding: "8px",
      }}
      readOnly
    />
  </Form.Item>
);

export default StackSelectField;
