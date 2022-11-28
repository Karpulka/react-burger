import React from 'react';
import { Link } from 'react-router-dom';

function NotFound404() {
  return (
    <div className="container">
      <div>
        <br />
        <Link to="/">Перейти в конструктор бургеров</Link>
      </div>
    </div>
  );
}

export default NotFound404;
