import Worker from './Worker';

const Workers = ({ workers, slotId }) => (
  <div className="workers-wrapper">
    <h3>Available workers for chosen slot</h3>
    <ul className="list">
      {workers.map(worker => (
        <Worker key={worker.id} worker={worker} slotId={slotId} />
      ))}
    </ul>
  </div>
);

export default Workers;
