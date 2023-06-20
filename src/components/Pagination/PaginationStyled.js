import styled from "styled-components";
const PaginationStyled = styled.div`
  display: block;
  width: fit-content;
  margin: auto;
  button {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: var(--app-black);
    border: 1px solid var(--app-white);
    border-right: 1px solid var(--app-white);
    color: var(--app-white);
    cursor: pointer;
  }
  * {
    user-select: none;
  }
  .active {
    background: #dcdcdc;
    color: #000;
  }
`;
export default PaginationStyled;
