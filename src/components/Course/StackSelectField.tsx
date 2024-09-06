import React from "react";
import { Form, Select } from "antd";
import * as T from "../../types";

const { Option } = Select;

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
    <Select
      placeholder={
        selectedSpot ? selectedSpot.name : "다녀온 핫플을 선택하세요.."
      }
      onClick={showModal}
      open={false}
    >
      <Option value="">{selectedSpot ? selectedSpot.name : "선택하기"}</Option>
    </Select>
  </Form.Item>
);

export default StackSelectField;
