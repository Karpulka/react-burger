import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFound404: FC = () => {
  return (
    <div className="container">
      <div>
        <br />
        <Link to="/">Перейти в конструктор бургеров</Link>
      </div>
    </div>
  );
};

export default NotFound404;
