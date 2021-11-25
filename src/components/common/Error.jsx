const Error = ({ message }) => {
  if (!message) return null;

  return <div className="message-box error">{message}</div>;
};

export default Error;
