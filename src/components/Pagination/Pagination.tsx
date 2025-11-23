import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={(event) => onPageChange(event.selected + 1)}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.arrow}
      nextClassName={css.arrow}
      disabledClassName={css.disabled}
      ariaLabelBuilder={(page) => `Page ${page}`}
      previousAriaLabel="Previous page"
      nextAriaLabel="Next page"
      breakAriaLabel="More pages"
    />
  );
};
