import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { FloatButtonProps } from 'antd';
import { Tooltip } from 'antd';

interface CustomLinkProps extends LinkProps {
  to: string; // 필수
  text?: string; // 선택적
  icon?: React.ReactNode; // 선택적
  tooltip?: string; // 선택적
  type?: FloatButtonProps['type']; // 선택적, FloatButton의 type
  style?: React.CSSProperties; // 선택적
}

const CustomLink: React.FC<CustomLinkProps> = ({
  to,
  text,
  icon,
  tooltip,
  type,
  style,
  ...props
}) => {
  const content = (
    <>
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </>
  );

  return (
    <Link to={to} {...props} style={{ ...style }}>
      {tooltip ? (
        <Tooltip title={tooltip}>
          <span>{content}</span>
        </Tooltip>
      ) : (
        content
      )}
    </Link>
  );
};

export default CustomLink;
