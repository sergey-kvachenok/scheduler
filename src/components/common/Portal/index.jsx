// libraries
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
