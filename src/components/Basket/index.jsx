// libraries
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
// components
import Item from './Item';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow-left.svg';
// constants
import { breakpoints } from '../../constants/theme';

const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
`;

const Button = styled.button`
  @media (max-width: ${breakpoints.xsMax}) {
    border-radius: 50%;
    display: block;
    margin-right: 0;
    margin-left: auto;
  }

  @media (min-width: ${breakpoints.sm}) {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  svg {
    height: 16px;
    width: 16px;
  }

  &:hover {
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  }

  .text {
    @media (max-width: ${breakpoints.xsMax}) {
      display: none;
    }

    @media (min-width: ${breakpoints.sm}) {
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
  const { t } = useTranslation(['basket', 'common']);
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
    <p>{t('emptyBasket')}</p>
  );

  return (
    <>
      <Button data-testid="back-button" onClick={moveBack} className="default-button secondary">
        <ArrowIcon />
        <span className="text">{t('common:back')}</span>
      </Button>
      <Container>
        <h1 className="page-title header">{t('header')}</h1>
        {content}
      </Container>
    </>
  );
};

export default Basket;
