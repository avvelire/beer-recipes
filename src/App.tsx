import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SingleBeer from './pages/SingleBeerPage';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="beer/:beerId" element={<SingleBeer />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
