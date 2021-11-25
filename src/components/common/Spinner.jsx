const Spinner = ({ loadingText = '' }) => {
  return (
    <div className={`spinner-and-text`}>
      <div className={`spinner-container`}>
        <div className={`spinner`} />
      </div>
      {loadingText && <p className="loading-text">{loadingText}</p>}
    </div>
  );
};

export default Spinner;
