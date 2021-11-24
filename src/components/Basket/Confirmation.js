import styled from "styled-components"

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
`

const Confirmation = ({text, confirm, cancel}) => {

  return (<Container>
  <h2>{text}</h2>
  <button data-testid="submit-button" className="default-button confirmation primary" onClick={confirm}>Confirm</button>
  <button data-testid="cancel-button" className="default-button secondary" onClick={cancel}>Cancel</button>
  </Container>)
}

export default Confirmation;