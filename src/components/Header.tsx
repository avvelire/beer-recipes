import React from 'react';
import beer from '../resources/img/Beer.png';

const Header: React.FC = () => {
  return (
    <div className="container">
      <a href="/" style={{ textDecoration: 'none', color: 'black' }}>
        <div className="container__logo">
          <img src={beer} alt="beer" className="container__img" />
          <h3 className="container__title">BeerMaster</h3>
        </div>
      </a>
    </div>
  );
};

export default Header;
