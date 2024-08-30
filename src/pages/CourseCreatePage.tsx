import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Modal, Select, List, Pagination, Spin, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
// import axios from 'axios'; // 서버 API 호출을 위해 사용, 현재 주석 처리

const { TextArea } = Input;
const { Option } = Select;

interface DataItem {
  id: number;
  name: string;
}

const CourseCreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalField, setModalField] = useState<string | null>(null);
  const [data, setData] = useState<DataItem[]>([]); // 서버에서 받아올 데이터를 저장하는 상태
  const [loading, setLoading] = useState<boolean>(false); // 데이터 로딩 상태
  const [total, setTotal] = useState<number>(0); // 총 데이터 수
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 번호
  const pageSize = 10; // 페이지당 데이터 개수

  // 서버와 관련된 코드 주석 처리 시작
  /*
  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get('https://your-api-endpoint.com/data', {
        params: {
          page,
          pageSize,
        },
      });
      setData(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  */
  // 서버와 관련된 코드 주석 처리 끝

  // 서버 사용 안 하고 구현된 부분 시작
  const fetchData = (page: number) => {
    setLoading(true);
    setTimeout(() => {
      const mockData = Array.from({ length: pageSize }, (_, i) => ({
        id: i + (page - 1) * pageSize,
        name: `Mock Stack ${i + (page - 1) * pageSize + 1}`,
      }));
      setData(mockData);
      setTotal(100); // 총 데이터 수를 임의로 설정
      setLoading(false);
    }, 500); // 0.5초 딜레이 후 데이터 로드
  };
  // 서버 사용 안 하고 구현된 부분 끝

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  useEffect(() => {
    if (isModalVisible) {
      fetchData(currentPage);
    }
  }, [isModalVisible]);

  const showModal = (field: string) => {
    setModalField(field);
    setIsModalVisible(true);
  };

  const handleOk = (value: string) => {
    if (modalField) {
      form.setFieldsValue({ [modalField]: value });
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: any) => {
    message.success('Form submitted successfully!');
    console.log('Form values:', values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      {/* 사진/이미지 업로드 */}
      <Form.Item name="upload" label="사진/이미지" valuePropName="fileList">
        <Upload listType="picture-card" beforeUpload={() => false}>
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      {/* 제목 입력 */}
      <Form.Item
        name="title"
        label="제목"
        rules={[{ required: true, message: '제목을 입력하세요.' }]}
      >
        <Input placeholder="제목을 입력하세요." />
      </Form.Item>

      {/* 관련 스택 선택 (모달 사용) */}
      {Array.from({ length: 4 }).map((_, index) => (
        <Form.Item
          key={index}
          name={`stack-${index}`}
          label={index === 0 ? '관련 스택' : ''}
          rules={[{ required: true, message: '관련 스택을 선택하세요.' }]}
        >
          <Select
            placeholder="다녀온 핫플을 선택하세요.."
            onClick={() => showModal(`stack-${index}`)}
            open={false}
          >
            <Option value="">선택하기</Option>
          </Select>
        </Form.Item>
      ))}

      {/* 내용 입력 */}
      <Form.Item name="description" label="내용">
        <TextArea rows={4} placeholder="이런 데이터는 어떠냐요?" />
      </Form.Item>

      {/* 등록 버튼 */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          등록하기
        </Button>
      </Form.Item>

      {/* 모달 */}
      <Modal
        title="Select a Stack"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {loading ? (
          <Spin />
        ) : (
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Button block onClick={() => handleOk(item.name)}>
                  {item.name}
                </Button>
              </List.Item>
            )}
          />
        )}
        <Pagination
          current={currentPage}
          total={total}
          pageSize={pageSize}
          onChange={handlePageChange}
          style={{ textAlign: 'center', marginTop: '16px' }}
        />
      </Modal>
    </Form>
  );
};

export default CourseCreatePage;
