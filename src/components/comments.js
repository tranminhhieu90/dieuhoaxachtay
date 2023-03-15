import { comments } from "@/uititiles/comments";
import styles from "./comments.module.css";
import ReactStars from "react-rating-stars-component";
import React, { useRef, useState } from "react";
import ReactPaginate from "react-paginate";
export default function Comments() {
  const divRef = useRef(null);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 5;
  const currentItems = comments.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(comments.length / 5);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % comments.length;
    divRef.current.scrollIntoView({ behavior: "smooth" });
    setItemOffset(newOffset);
  };
  return (
    <div className={styles.wrapper}>
      <div ref={divRef} className={styles.comments}>Tất cả bình luận</div>
      <div className={styles.all_comments}>{comments.length} Bình luận</div>
      <div className={styles.line}></div>
      {currentItems.map((item, index) => {
        return (
          <div key={index} className={styles.comment_item}>
            <div className={styles.avatar}>
              <img src={item.avatar} />
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.comment}>{item.comment}</div>
              <div className={styles.vote}>
                <ReactStars {...{ size: 16, value: item.vote, edit: false }} />
              </div>
              <div className={styles.time}>{item.time}</div>
              <div className={styles.reply}>
                <div className={styles.reply_image}>
                  <img src="images/reply_image.JPG" />
                </div>
                <div className={styles.product}>
                  <p>Điều hoà thông minh</p>
                  <h6> Cám ơn anh/chị đã tin tưởng sử dụng sản phẩm ạ!</h6>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div id="container">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          pageClassName={styles.page_item}
          pageLinkClassName={styles.page_link}
          previousClassName={styles.page_item}
          previousLinkClassName={styles.page_link}
          nextClassName={styles.page_item}
          nextLinkClassName={styles.page_link}
          breakClassName={styles.page_item}
          breakLinkClassName={styles.page_link}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
        />
      </div>
    </div>
  );
}
