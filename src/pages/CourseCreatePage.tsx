import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import StackModal from "../components/Course/StackModal";
import StackSelectField from "../components/Course/StackSelectField";
import useFetchModalData from "../hooks/useFetchModalData";
import * as T from "../types";
import { useAuth } from "../context/AuthContext";
import { Link, redirect } from "react-router-dom";

const { TextArea } = Input;

const CourseCreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalField, setModalField] = useState<string | null>(null);
  const [selectedSpots, setSelectedSpots] = useState<{
    [key: string]: T.DataItem;
  }>({});
  const { user } = useAuth();
  const {
    data,
    loading,
    error, // 수정된 부분: error 추가
    total,
    currentPage,
    setCurrentPage,
    fetchData,
  } = useFetchModalData();
  const apiEndpoint =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

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
      console.log("Received value of form:", values);
      if (!values.upload || !values.upload.length) {
        message.error("이미지를 업로드해 주세요.");
        return;
      }

      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });

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
      setFileList([]);
      redirect("/course");
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to submit the form.");
    }
  };

  const normFile = (e: { fileList: any }) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div
      style={{
        marginTop: "40px",
        position: "relative",
        padding: "16px",
      }}
    >
      {/* 닫기 버튼 */}
      <Link to="/course">
        <span
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: "16px", color: "black" }} />{" "}
        </span>
      </Link>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto", fontWeight: "bold" }}
      >
        {/* 이전 변경사항 유지 */}
        <Form.Item
          name="upload"
          label="사진/이미지"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={(file) => {
              const isValidSize = file.size / 1024 / 1024 < 3; // Limit to 3MB
              if (!isValidSize) {
                message.error("파일 크기는 2MB를 초과할 수 없습니다.");
              }
              return isValidSize || Upload.LIST_IGNORE;
            }}
            multiple={true}
          >
            {fileList.length >= 8 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          name="title"
          label="제목"
          rules={[{ required: true, message: "제목을 입력하세요." }]}
        >
          <Input
            placeholder="제목을 입력하세요."
            style={{
              backgroundColor: "#f7f7f7",
              borderRadius: "10px",
              border: "1px solid #e0e0e0",
              padding: "8px",
            }}
          />
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
          <TextArea
            rows={4}
            placeholder="이번 데이트는 어땠나요?"
            style={{
              backgroundColor: "#f7f7f7",
              borderRadius: "10px",
              border: "1px solid #e0e0e0",
              padding: "10px",
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              backgroundColor: "black",
              borderRadius: "30px",
              border: "1px solid #e0e0e0",
              color: "white",
              padding: "25px",
              fontSize: "17px",
            }}
          >
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
          error={error} // 수정된 부분: error prop 추가
        />
      </Form>
    </div>
  );
};

export default CourseCreatePage;
