import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/home/Home';
import XmSports from '@/pages/xmSports/XmSports';
import NotFound from '@/components/404'

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home/*" element={<Home />} />
      <Route path="/xmSports/*" element={<XmSports />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Routing;
