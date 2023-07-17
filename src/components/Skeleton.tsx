import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={210}
    height={355}
    viewBox="0 0 210 355"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="56" y="196" rx="0" ry="0" width="0" height="8" />
    <rect x="73" y="69" rx="0" ry="0" width="1" height="0" />
    <rect x="70" y="241" rx="0" ry="0" width="0" height="1" />
    <rect x="95" y="135" rx="0" ry="0" width="13" height="0" />
    <rect x="20" y="0" rx="33" ry="33" width="145" height="200" />
    <rect x="23" y="215" rx="17" ry="17" width="90" height="28" />
    <rect x="24" y="252" rx="20" ry="20" width="142" height="62" />
    <rect x="28" y="324" rx="15" ry="15" width="70" height="24" />
    <rect x="142" y="322" rx="15" ry="15" width="25" height="26" />
  </ContentLoader>
);

export default Skeleton;
