import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import StackModal from '../components/Course/StackModal';
import StackSelectField from '../components/Course/StackSelectField';
import useFetchModalData from '../hooks/useFetchModalData';
import * as T from '../types';

const { TextArea } = Input;

const CourseCreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalField, setModalField] = useState<string | null>(null);
  const [selectedSpots, setSelectedSpots] = useState<{ [key: string]: T.DataItem }>({});
  const { data, loading, total, currentPage, setCurrentPage, fetchData } = useFetchModalData();

  useEffect(() => {
    if (isModalVisible) {
      fetchData(currentPage);
    }
  }, [isModalVisible]);

  const showModal = (field: string) => {
    setModalField(field);
    setIsModalVisible(true);
  };

  const handleOk = (value: T.DataItem) => {
    if (modalField) {
      setSelectedSpots(prev => ({
        ...prev,
        [modalField]: value
      }));
      form.setFieldsValue({ [modalField]: value.name });
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: any) => {
    try {
      const courseResponse = await axios.post('https://api-endpoint.com/courses', {
        title: values.title,
        description: values.description,
        image: values.upload,
      });

      const courseId = courseResponse.data.id;

      const spotLinks = Object.keys(selectedSpots).map(key => {
        const spot = selectedSpots[key];
        return {
          F_course_id: courseId,
          F_spot_id: spot.id,
        };
      });

      await axios.post('https://api-endpoint.com/course-spot-links', {
        links: spotLinks,
      });

      message.success('Form submitted successfully!');
      form.resetFields();
      setSelectedSpots({});
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Failed to submit the form.');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      <Form.Item name="upload" label="사진/이미지" valuePropName="fileList">
        <Upload listType="picture-card" beforeUpload={() => false}>
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item
        name="title"
        label="제목"
        rules={[{ required: true, message: '제목을 입력하세요.' }]}
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

      <Form.Item name="description" label="내용">
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