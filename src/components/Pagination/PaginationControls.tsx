import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { TPaginationControls } from "../../types/components/pagination";
import styled from "@emotion/styled";
import { WrapperButton } from "../../globalStyles/form";
const Container = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

const PaginationControls: FC<TPaginationControls> = ({
  count,
  limit,
  offsite,
  setOffsite,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const onHandlerPrevPage = useCallback(() => {
    setOffsite((prev) => prev - 10);
    setPageNumber((prev) => prev - 1);
  }, [count]);
  const onHandlerNextPage = useCallback(() => {
    setOffsite((prev) => prev + 10);
    setPageNumber((prev) => prev + 1);
  }, [count]);
  return (
    <Container>
      <WrapperButton>
        <button
          className="bg-blue-500 text-white p-1"
          disabled={!Boolean(offsite)}
          onClick={onHandlerPrevPage}
        >
          prev page
        </button>
      </WrapperButton>

      <div>{pageNumber}</div>
      <WrapperButton>
        <button
          className="bg-blue-500 text-white p-1"
          disabled={count < limit}
          onClick={onHandlerNextPage}
        >
          next page
        </button>
      </WrapperButton>
    </Container>
  );
};

export default memo(PaginationControls);
