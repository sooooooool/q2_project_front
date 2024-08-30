import React, { useState } from "react"
import { Card as AntCard, Avatar, Typography } from "antd"
import CustomLink from "../Common/Link"

const { Title, Text } = Typography

interface LocationCardProps {
  locationName: string
  imageUrl: string
  linkUrl: string
  style?: React.CSSProperties;
}

const LocationCard: React.FC<LocationCardProps> = ({ locationName, imageUrl, linkUrl}) => {
  return (
    <>
      <CustomLink to={linkUrl} 
      style={{ width: "100%", height:"160px", marginBottom: 16, borderRadius: 16 ,justifyContent:"center",alignItems:"center",textAlign:"center"}}
      icon={<AntCard
        hoverable
        style={{ width: "100%", height:"160px", marginBottom: 16, borderRadius: 16 ,display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
        <Title level={1} style={{ width:"100%", height:"100%", fontSize:"48px",fontWeight:"700",fontStyle:"normal", color:"#ff6f0f" }} >{locationName}</Title>
      </AntCard>} 
      />
    </>
  )
}

export default LocationCard