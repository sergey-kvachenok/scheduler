import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Item from './Item';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow-left.svg';

const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
  width: 100%;

  .header {
    align-items: center;
    border-bottom: 4px solid ${({ theme }) => theme.colors.coral};
    margin-bottom: 25px;
  }

  .back-button {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      svg {
        fill: ${({ theme }) => theme.colors.white};
      }
    }

    .text {
      font-size: 16px;
      margin-left: 5px;
    }
  }
`;

const getSlotInfo = (slots, combinedSlotData) => {
  const slotsCopy = [...slots];
  const combinedSlotDataCopy = [...combinedSlotData];

  return slotsCopy
    .filter(({ workers }) => workers.length)
    .map(({ id, workers }) => {
      const appropriateSlotInfo = combinedSlotDataCopy?.find(({ slot }) => slot.id === id);

      const { workers: appropriateSlotBookedWorkers } = appropriateSlotInfo || {};

      const filteredWorkers = appropriateSlotBookedWorkers.reduce((acc, worker) => {
        return workers.includes(worker.id) ? [...acc, worker] : [...acc];
      }, []);

      return {
        slot: { ...appropriateSlotInfo.slot },
        workers: filteredWorkers,
      };
    });
};

const Basket = () => {
  const navigate = useNavigate();
  const { data = [] } = useSelector(({ tableInfo }) => tableInfo || {});
  const { slots = [] } = useSelector(({ basket }) => basket || {});

  const moveBack = () => {
    navigate('/');
  };

  const slotInfo = getSlotInfo(slots, data);

  const content = slotInfo?.length ? (
    slotInfo?.map(({ slot, workers }) => <Item key={slot?.id} slot={slot} workers={workers} />)
  ) : (
    <p>You basket is still empty</p>
  );

  return (
    <Container>
      <button data-testid="back-button" onClick={moveBack} className="default-button secondary back-button">
        <ArrowIcon />
        <span className="text">Back</span>
      </button>
      <h3 className="header">Slots to purchasing</h3>
      {content}
    </Container>
  );
};

export default Basket;
