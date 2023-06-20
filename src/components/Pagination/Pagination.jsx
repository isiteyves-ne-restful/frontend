import React, { useState } from "react";
import PaginationStyled from "./PaginationStyled";

function Pagination({ numberOfPages, activePage, changeActivePage }) {
  const [active, setActive] = useState(1);
  const changePage = (pageNumber) => {
    setActive(pageNumber);
    changeActivePage(pageNumber);
  };
  const [startPage, setStartPage] = useState(1);
  return (
    <PaginationStyled>
      <button
        title={startPage !== 1 ? "Previous page group" : ""}
        onClick={() => {
          if (startPage - 10 > 0) {
            changePage(startPage - 10);
            setStartPage(startPage - 10);
          }
        }}
        style={{
          opacity: startPage === 1 ? 0.3 : 1,
          cursor: startPage === 1 ? "not-allowed" : "pointer",
        }}
        disabled={startPage === 1}
      >
        &lt;&lt;
      </button>
      {numberOfPages > 10 ? (
        <>
          {Array.from(Array(numberOfPages), (e, i) => {
            return (
              <>
                {i + 1 >= startPage && i + 1 <= startPage + 9 ? (
                  <button
                    key={i}
                    onClick={(e) => changePage(i + 1)}
                    className={active === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </>
      ) : (
        <>
          {Array.from(Array(numberOfPages), (e, i) => {
            return (
              <button
                key={i}
                onClick={(e) => changePage(i + 1)}
                className={active === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            );
          })}
        </>
      )}
      <button
        title={startPage + 9 < numberOfPages ? "Next page group" : ""}
        onClick={() => {
          if (startPage + 10 <= numberOfPages) {
            changePage(startPage + 10);
            setStartPage(startPage + 10);
          }
        }}
        style={{
          opacity: startPage + 9 >= numberOfPages ? 0.3 : 1,
          cursor: startPage + 9 >= numberOfPages ? "not-allowed" : "pointer",
        }}
        disabled={startPage + 9 >= numberOfPages}
      >
        &gt;&gt;
      </button>
    </PaginationStyled>
  );
}

export default Pagination;
