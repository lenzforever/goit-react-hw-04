import css from './ImageCard.module.css';

const ImageCard = ({ title, url, likes, openModal, setCurrentImage }) => {
  const handleClick = () => {
    setCurrentImage({ url: url.full, alt: title });
    openModal();
  };

  return (
    <div onClick={handleClick} className={css.card}>
      <img className={css.image} src={url.small} alt={title} />
      <div className={css.info}>
        <p className={css.likes}>Likes: {likes}</p>
        <p className={css.title}>{title}</p>
      </div>
    </div>
  );
};

export default ImageCard;
