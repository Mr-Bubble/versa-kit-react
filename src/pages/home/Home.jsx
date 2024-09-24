import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import QrCodeIcon from '@mui/icons-material/QrCode';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CollectionsIcon from '@mui/icons-material/Collections';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PlaceIcon from '@mui/icons-material/Place';
import MagicIcon from '@mui/icons-material/AutoFixHigh';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const contentList = [
    {
      title: "工具",
      sub: [
        {
          icon: <TrendingUpIcon />,
          path: "xmSports",
          title: "运动小助手",
          color: "#2196F3",
          display: true
        },
        {
          icon: <QrCodeIcon />,
          path: "qrcode",
          title: "二维码生成",
          color: "#E91E63",
          display: false
        },
        {
          icon: <OndemandVideoIcon />,
          path: "video",
          title: "视频去水印",
          color: "#FF4081",
          display: true
        },
        {
          icon: <CollectionsIcon />,
          path: "images",
          title: "图集去水印",
          color: "#795548",
          display: true
        }
      ]
    },
    {
      title: "光遇",
      sub: [
        {
          icon: <LocalFireDepartmentIcon />,
          path: "height",
          title: "查身高",
          color: "#00BCD4",
          display: true
        },
        {
          icon: <PlaceIcon />,
          path: "daily-location",
          title: "每日位置",
          color: "#8BC34A",
          display: true
        },
        {
          icon: <MagicIcon />,
          path: "daily-magic",
          title: "每日魔法",
          color: "#9C27B0",
          display: true
        }
      ]
    }
  ];

  const handleNavigation = (path) => {
    navigate('/' + path);
  };

  return (
    <Box sx={{ padding: 2, minHeight: '100vh' }}>
      {contentList.map((item, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <Typography level="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            {item.title}
          </Typography>

          <Grid container spacing={2}>
            {item.sub.map((subItem, subIndex) => (
              subItem.display && (
                <Grid xs={4} key={subIndex}>
                  <Card
                    sx={{
                      backgroundColor: subItem.color,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'transform 0.3s',
                    }}
                    onClick={() => handleNavigation(subItem.path)}
                  >
                    <CardContent sx={{ textAlign: 'center', flex: 1 }}>
                      <IconButton sx={{ '--Icon-color': '#fff' }}>
                        {subItem.icon}
                      </IconButton>
                      <Typography level="body1" sx={{ color: '#fff' }}>
                        {subItem.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
