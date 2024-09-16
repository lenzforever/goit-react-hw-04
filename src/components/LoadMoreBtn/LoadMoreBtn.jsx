import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className={css.loadMoreBtn} type="button">
      Load more
    </button>
  );
};

export default LoadMoreBtn;
