import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TabBar() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const location = useLocation(); // 获取当前路径

  // TabBar data
  const tabBarData = [
    {
      icon: <HomeIcon />,
      title: "主页",
      to: "/home"
    },
    {
      icon: <CategoryIcon />,
      title: "工具",
      to: "/tools"
    },
    {
      icon: <AccountCircleIcon />,
      title: "关于",
      to: "/about"
    }
  ];

  // 每当 location 发生变化时更新 active 状态
  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = tabBarData.findIndex(tab => tab.to === currentPath);
    if (activeIndex !== -1) {
      setActive(activeIndex);
    }
  }, [location.pathname, tabBarData]); // 监听路径变化

  const handleChange = (event, newValue) => {
    setActive(newValue);
    navigate(tabBarData[newValue].to);
  };

  return (
    <BottomNavigation
      value={active}
      onChange={handleChange}
      showLabels
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
    >
      {tabBarData.map((item, index) => (
        <BottomNavigationAction
          key={index}
          label={item.title}
          icon={item.icon}
        />
      ))}
    </BottomNavigation>
  );
}
