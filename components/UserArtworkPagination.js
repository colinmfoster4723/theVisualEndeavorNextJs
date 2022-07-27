import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import classes from "./styles/pagination.module.scss";
import UserArtwork from "./UserArtwork";
// Example items, to simulate fetching from another resources.
function UserArtworkPagination(props) {
  const { images } = props;

  function Items({ currentItems }) {
    return (
      <>
        <div className={classes.artworkContain}>
          {currentItems &&
            currentItems.map((img) => (
              <div key={img.aid + "div"}>
                <UserArtwork img={img} key={img.aid} />
              </div>
            ))}
        </div>
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(images.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(images.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % images.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          className={classes.paginationContain}
          pageLinkClassName={classes.el}
          nextLinkClassName={classes.btn}
          previousLinkClassName={classes.btn}
          disabledClassName={classes.disabled}
          breakLabel="~~~"
          nextLabel=">>>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<<<"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  return <PaginatedItems itemsPerPage={3} />;
}

export default UserArtworkPagination;
