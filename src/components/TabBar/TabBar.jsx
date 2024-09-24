import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Person from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TabBar() {
  const colors = ['primary', 'danger', 'warning'];
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // TabBar data
  const tabBarData = [
    {
      icon: <HomeRoundedIcon />,
      title: "主页",
      to: "/home",
      color: "primary"
    },
    {
      icon: <FavoriteBorder />,
      title: "工具",
      to: "/tools",
      color: "danger"
    },
    {
      icon: <Person />,
      title: "关于",
      to: "/about",
      color: "warning"
    }
  ];

  // 更新活动索引
  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = tabBarData.findIndex(tab => tab.to === currentPath);
    if (activeIndex !== -1) {
      setIndex(activeIndex);
    }
  }, [location.pathname, tabBarData]);

  const handleChange = (event, newValue) => {
    setIndex(newValue);
    navigate(tabBarData[newValue].to);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        flexGrow: 1,
        m: -3,
        p: 4,
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        bgcolor: `${'var(--colors-index)'}.500`,
      }}
      style={{ '--colors-index': colors[index] }}
    >
      <Tabs
        size="lg"
        aria-label="Bottom Navigation"
        value={index}
        onChange={handleChange}
        sx={(theme) => ({
          p: 1,
          borderRadius: 16,
          maxWidth: 400,
          mx: 'auto',
          boxShadow: theme.shadow.sm,
          '--joy-shadowChannel': theme.vars.palette[colors[index]].darkChannel,
          [`& .${tabClasses.root}`]: {
            py: 1,
            flex: 1,
            transition: '0.3s',
            fontWeight: 'md',
            fontSize: 'md',
            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
              opacity: 0.7,
            },
          },
        })}
      >
        <TabList variant="plain" size="sm" disableUnderline sx={{ borderRadius: 'lg', p: 0 }}>
          {tabBarData.map((item, index) => (
            <Tab key={index} disableIndicator orientation="vertical" color={item.color} >
              <ListItemDecorator>
                {item.icon}
              </ListItemDecorator>
              {item.title}
            </Tab>
          ))}
        </TabList>
      </Tabs>
    </Box>
  );
}