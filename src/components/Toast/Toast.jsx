import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Toast = ({ toastList }) => {
  const toastsEl = useRef(null);
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList(toastList);
  }, [toastList, list]);

  useEffect(() => {
    if (toastsEl) {
      toastsEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  return (
    <>
      <div className="toast-container" ref={toastsEl}>
        {list.map((toast, i) => (
          <div className="toast-notif" key={i}>
            <div>
              <p className={`title ${toast.type}`}>{toast.title}</p>
              <p className="message">{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx="true">
        {`
          .toast-container {
            box-sizing: border-box;
            position: fixed;
            right: 0;
            overflow-x: hidden;
            overflow-y: auto;
            -ms-overflow-style: none;
            overflow: -moz-scrollbars-none;
            padding: 10px;
            max-height: calc(100vh - 120px);
            bottom: 0;
            right: 12px;
            transition: transform 0.4s ease-in-out;
            animation: toast-in-right 0.5s;
            z-index: 999;
          }

          .toast-container::-webkit-scrollbar {
            width: 0 !important;
            height: 0 !important;
          }

          .toast-notif {
            background-color: #fff;
            padding: 1rem 2rem;
            margin: 0.5rem;
            border-radius: 16px;
            width: clamp(200px, 50vw, 400px);
            position: relative;
            transition: 0.3s ease;
            box-shadow: 0 0 15px rgba(25, 25, 25, 0.15);
            border: 1px solid var(--line-color);
          }

          .toast-notif .title {
            padding-right: 1rem;
            color: var(--color-dark);
            font-size: 16px;
            font-weight: 700;
            margin: 0.25rem 0;
          }

          .toast-notif .message {
            color: var(--color);
            margin: 0 0 0.5rem 0;
            font-size: 14px;
            line-height: 1.2;
            padding-right: 1rem;
            font-weight: 500;
          }

          .success {
            color: var(--app-color) !important;
          }

          .error {
            color: rgb(210, 16, 16) !important;
          }

          @keyframes toast-in-right {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </>
  );
};

Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
};

export default Toast;
