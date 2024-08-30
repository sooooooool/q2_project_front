import React, { useState } from 'react'
import { Row, Col, Rate, Dropdown, Menu, FloatButton, Input } from 'antd'
import CourseCard from '../components/Course/Course'

import * as I from '../assets/random'
import { DownOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Title from 'antd/es/skeleton/Title';
import CustomLink from '../components/Common/Link';



const CourseSelectPage: React.FC = () => {
  const courses = [
    {
      title: '코스 제목 1',
      userName: '유저 닉네임 1',
      tags: ['#맛집','#산책'],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 4.0,
      ratingCount: 10,
    },
    {
      title: '코스 제목 2',
      userName: '유저 닉네임 2',
      tags: ['#카페','#산책'],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.5,
      ratingCount: 5,
    },
    {
      title: '코스 제목 3',
      userName: '유저 닉네임 3',
      tags: ['#맛집','#산책'],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 4.5,
      ratingCount: 20,
    },
    {
      title: '코스 제목 4',
      userName: '유저 닉네임 4',
      tags: ['#카페','#산책'],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.0,
      ratingCount: 2,
    },{
      title: '코스 제목 5',
      userName: '유저 닉네임 5',
      tags: ['#카페','#산책'],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.0,
      ratingCount: 2,
    },{
      title: '코스 제목 6',
      userName: '유저 닉네임 6',
      tags: ['#카페','#산책'],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.0,
      ratingCount: 2,
    },{
      title: '코스 제목 7',
      userName: '유저 닉네임 7',
      tags: ['#카페','#산책'],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.0,
      ratingCount: 2,
    },{
      title: '코스 제목 8',
      userName: '유저 닉네임 8',
      tags: ['#카페','#산책'],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.0,
      ratingCount: 2,
    },{
      title: '코스 제목 9',
      userName: '유저 닉네임 9',
      tags: ['#카페','#산책'],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.0,
      ratingCount: 2,
    }
  ]
  return (
    <>
      <div style={{display: "flex", height: "32px", padding : "4px 0px", flexDirection: "column", gap: "10px" ,flexShrink: "0"}} >
        {/* <Dropdown menu={} /> */}
      </div>
      <div style={{display : "flex", padding : "12px 16px", flexDirection : "column", alignItems : "flex-start", alignSelf : "stretch"}}>
        <Input prefix={<SearchOutlined/>} 
          placeholder="코스명 또는 태그로 검색"
          maxLength={40} 
          style={{backgroundColor : "#f5f5f5", display :"flex", padding : "8px 16px 8px 8px", alignItems : "center", flex : "1 0 0", alignSelf: "stretch", borderRadius : "12px" }} />
      </div>
      <Row justify="center" style={{ width: '100%' }}>
        <Col xs={24} sm={22}>
          {courses.map((card, index) => (
            <CourseCard
              key={index}
              title={card.title}
              userName={card.userName}
              tags={card.tags}
              imageUrl={card.imageUrl}
              time={card.time}
              comments={card.comments}
              likes={card.likes}
              meanrating={card.meanrating}
              ratingCount={card.ratingCount}
            />
          ))}
        </Col>
      </Row>
      <CustomLink to="/course/create" icon={<FloatButton icon={<PlusOutlined />} type="primary" tooltip="Add something" />} />
    </>
  )
}

export default CourseSelectPage;
