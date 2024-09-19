import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import StackModal from "../components/Course/StackModal";
import StackSelectField from "../components/Course/StackSelectField";
import useFetchModalData from "../hooks/useFetchModalData";
import * as T from "../types";
import { useAuth } from "../context/AuthContext";

const { TextArea } = Input;

const CourseCreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalField, setModalField] = useState<string | null>(null);
  const [selectedSpots, setSelectedSpots] = useState<{
    [key: string]: T.DataItem;
  }>({});
  const { user } = useAuth();
  const { data, loading, total, currentPage, setCurrentPage, fetchData } =
    useFetchModalData();
  const apiEndpoint =
    process.env.REACT_APP_BACKEND_URL || "https://datepeek.link";

  useEffect(() => {
    if (isModalVisible) {
      fetchData();
    }
  }, [isModalVisible, currentPage]);

  const showModal = (field: string) => {
    setModalField(field);
    setIsModalVisible(true);
  };

  const handleOk = (value: T.DataItem) => {
    if (modalField) {
      setSelectedSpots((prev) => ({
        ...prev,
        [modalField]: value,
      }));
      form.setFieldsValue({ [modalField]: value.Spot_Name });
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (!values.upload || !values.upload.length) {
        message.error("이미지를 업로드해 주세요.");
        return;
      }

      const formData = new FormData();
      formData.append("image", values.upload[0].originFileObj);

      const courseResponse = await axios.post(`${apiEndpoint}/course-api`, {
        F_User_id: user?.id,
        Course_title: values.title,
        Course_content: values.content,
        F_Course_Location: 1, // 우선 성수로 저장할거라 1로 고정
        spots: Object.keys(selectedSpots).map((key) => selectedSpots[key].id),
      });

      const courseId = courseResponse.data.id;

      await axios.post(
        `${apiEndpoint}/course-api/image?courseId=${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("Form submitted successfully!");
      form.resetFields();
      setSelectedSpots({});
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to submit the form.");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <Form.Item name="upload" label="사진/이미지" valuePropName="fileList">
        <Upload
          listType="picture-card"
          beforeUpload={(file) => {
            const isValidSize = file.size / 1024 / 1024 < 2; // Limit to 2MB
            if (!isValidSize) {
              message.error("파일 크기는 2MB를 초과할 수 없습니다.");
            }
            return isValidSize;
          }}
        >
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item
        name="title"
        label="제목"
        rules={[{ required: true, message: "제목을 입력하세요." }]}
      >
        <Input placeholder="제목을 입력하세요." />
      </Form.Item>

      {Array.from({ length: 4 }).map((_, index) => (
        <StackSelectField
          key={index}
          index={index}
          showModal={() => showModal(`stack-${index}`)}
          selectedSpot={selectedSpots[`stack-${index}`]}
        />
      ))}

      <Form.Item name="content" label="내용">
        <TextArea rows={4} placeholder="이런 데이터는 어떠냐요?" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          등록하기
        </Button>
      </Form.Item>

      <StackModal
        visible={isModalVisible}
        loading={loading}
        data={data}
        total={total}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onCancel={handleCancel}
        onSelect={handleOk}
      />
    </Form>
  );
};

export default CourseCreatePage;
