// libraries
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  max-width: 400px;
  padding: 15px;
  width: 100%;
  z-index: 1;

  h2 {
    font-size: 20px;
  }

  .confirmation {
    margin-right: 30px;
  }
`;

const Confirmation = ({ text, confirm, cancel }) => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <h3 className="modal-title">{text}</h3>

      <button
        aria-label="Confirm action"
        data-testid="submit-button"
        className="default-button confirmation primary"
        onClick={confirm}
      >
        {t('confirm')}
      </button>
      <button
        aria-label="Cancel action"
        data-testid="cancel-button"
        className="default-button secondary"
        onClick={cancel}
      >
        {t('cancel')}
      </button>
    </Container>
  );
};

export default Confirmation;
