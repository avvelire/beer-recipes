import React from 'react';
import { Link } from 'react-router-dom';

import style from './notFoundBlock.module.scss';
import bottle from '../../resources/img/bottle.png';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={style.root}>
      <img height={100} width={100} src={bottle} alt="broken bottle" />
      <br />
      <h1>Page is not found</h1>
      <p className={style.description}>Unfortunately, nothing was found</p>
      <Link to="/">
        <button>return to the main page</button>
      </Link>
    </div>
  );
};

export default NotFoundBlock;
