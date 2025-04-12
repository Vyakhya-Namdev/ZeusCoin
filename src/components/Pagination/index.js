import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import "./styles.css";

export default function PaginationComponent({ page, handlePageChange, totalPages }) {
  return (
    <div className="pagination-div">
      <Pagination
        sx={{
          "& .MuiPaginationItem-text": {
            color: "#fff !important",
            border: "1px solid var(--gray-text)",
          },
          "& .Mui-selected": {
            backgroundColor: "var(--primary-highlight)",
            borderColor: "var(--primary-highlight)",
          },
          "& .MuiPaginationItem-ellipsis": {
            border: "none",
          },
        }}
        count={totalPages}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}
