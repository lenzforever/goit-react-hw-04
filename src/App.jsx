import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import fetchPhotos from './fetchAPI';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchingValue, setSearchingValue] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentImage, setCurrentImage] = useState({
    url: '',
    alt: '',
  });

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (!searchingValue.trim()) return;

    const getPhotos = async (value) => {
      setError(false);
      setIsLoading(true);

      try {
        const data = await fetchPhotos(value, pageNumber);
        setImages((prevImages) => (pageNumber === 1 ? data.results : [...prevImages, ...data.results]));
        setTotalPages(data.total_pages);

        if (data.total_pages === 0) {
          toast.error('Nothing was found for your request', {
            duration: 4000,
            position: 'top-right',
          });
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPhotos(searchingValue);
  }, [searchingValue, pageNumber]);

  const handleSubmit = (userValue) => {
    setPageNumber(1);
    setSearchingValue(userValue);
  };

  return (
    <div className="app-container">
      <SearchBar onSubmit={handleSubmit} />
      <Toaster />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          openModal={openModal}
          setCurrentImage={setCurrentImage}
        />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        currentImage={currentImage}
      />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {totalPages > pageNumber && !isLoading && (
        <LoadMoreBtn handleClick={() => setPageNumber((prev) => prev + 1)} />
      )}
    </div>
  );
};

export default App;
