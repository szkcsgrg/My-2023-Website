import React, { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';

function PhotographyClient() {
    const googleAPIKey = process.env.REACT_APP_GOOGLE_API_KEY;
    //https://drive.google.com/drive/folders/1PJCW0lx5EDeUjvVU1omit4ZBHPdj5TJO?export=download
    //"https://drive.google.com/uc?id=1q3y_XkF57F_QQrrnA3Hgm-bI-mN9M8du&export=download"
    // const folder = '1PJCW0lx5EDeUjvVU1omit4ZBHPdj5TJO'; // Kati Tibi
    const folder = '1-E9DefxpYzJ4GYVKHTn3tJ4nRBzGH97b'; // Kati Tibi kozos
    // const folder = "1JfGJG2PPBkomieu5gwa_0oovjwvpLExy" // Nati Dugo
    // const folder = "1kSE0yiHGwaR6tciqyAfshUAR6-DTeDn-" //Laura David



    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [loadedImages, setLoadedImages] = useState(new Set());
    const [batchLoading, setBatchLoading] = useState(false);
    const [pageToken, setPageToken] = useState('');
    const observer = useRef();
    const retryCount = useRef({});
    const initialLoad = useRef(true); // Track initial load

    const [modalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    

    //Eredeti solution
    {/*
      
    useEffect(() => {
      const fetchFiles = async (pageToken = '') => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${folder}'+in+parents&key=${googleAPIKey}&fields=nextPageToken,files(id,name,thumbnailLink,webContentLink,webViewLink)&pageToken=${pageToken}`
          );
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log('Fetched files:', data.files); // Log the fetched files
          setFiles(prevFiles => [...prevFiles, ...data.files]);
    
          if (data.nextPageToken) {
            fetchFiles(data.nextPageToken); // Fetch next page
          }
        } catch (error) {
          console.error('Error fetching files:', error);
        }
      };
    
      setFiles([]); // Clear previous files
      fetchFiles();
    }, [folder]);
    */}
    
    //Merged
    {/*
    const fetchFiles = async (pageToken = '', isInitialLoad = false) => {
      try {
        console.log(`Fetching files with pageToken: ${pageToken}`);
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${folder}'+in+parents&key=${googleAPIKey}&pageSize=100&fields=nextPageToken,files(id,name,thumbnailLink,webContentLink,webViewLink)&pageToken=${pageToken}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const filteredFiles = data.files.filter(file => !file.webViewLink.includes('/drive/'));
        const newFiles = filteredFiles.filter(file => !files.some(prevFile => prevFile.id === file.id));
        
        // Wait for 5 seconds before updating the state
        setTimeout(() => {
          setFiles(prevFiles => [...prevFiles, ...newFiles]); // Append the new files to the existing files
          setBatchLoading(false);
        }, 5000);

        setPageToken(data.nextPageToken || '');

        if (isInitialLoad) {
          setLoading(false); // Set loading to false after the first fetch
        }

        if (!data.nextPageToken) {
          setLoading(false); // All files are loaded
        }
      } catch (error) {
        console.error('Error fetching files:', error);
        setLoading(false);
      }
    };

    useEffect(() => {
      setFiles([]); // Clear previous files
      fetchFiles('', true); // Initial load
    }, [folder, googleAPIKey]);

    useEffect(() => {
      if (observer.current) {
        observer.current.disconnect();
      }

      const callback = (entries) => {
        if (entries[0].isIntersecting && pageToken) {
          console.log('Fetching more files...');
          setBatchLoading(true);
          fetchFiles(pageToken);
        }
      };

      observer.current = new IntersectionObserver(callback, {
        root: null,
        rootMargin: '2000px', // Trigger earlier
        threshold: 0.1
      });
      const target = document.querySelector('.load-more-trigger');
      if (target) {
        observer.current.observe(target);
      }

      return () => observer.current && observer.current.disconnect();
    }, [pageToken]);

    const handleImageError = (e) => {
      const src = e.target.src;
      const id = e.target.dataset.id;

      if (!retryCount.current[id]) {
        retryCount.current[id] = 0;
      }

      if (retryCount.current[id] < 10) { // Increased retry limit to 10
        retryCount.current[id] += 1;
        console.log(`Retrying to load image ${id}, attempt ${retryCount.current[id]}`);
        e.target.src = ''; // Clear the src to trigger a reload
        setTimeout(() => {
          e.target.src = src; // Retry loading the image
        }, 2000); // Retry after 2 seconds
      } else {
        console.error(`Failed to load image after 10 attempts: ${src}`);
      }
    };
    */}

    
    const fetchFiles = async (pageToken = '', isInitialLoad = false) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${folder}'+in+parents&key=${googleAPIKey}&pageSize=100&fields=nextPageToken,files(id,name,thumbnailLink,webContentLink,webViewLink)&pageToken=${pageToken}`
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        const filteredFiles = data.files.filter(file => !file.webViewLink.includes('/drive/'));
        const newFiles = filteredFiles.filter(file => !files.some(prevFile => prevFile.id === file.id));
  
        
        setFiles(prevFiles => [...prevFiles, ...newFiles]); // Append the new files to the existing files
        setPageToken(data.nextPageToken || '');
        console.log('Fetched files:', newFiles); // Log the fetched files
        if (isInitialLoad) {
          setTimeout(() => {
            setLoading(false); // Set loading to false after 10 seconds
          }, 10000);
        }

        if (isInitialLoad) {
          // setLoading(false); // Set loading to false after the first fetch
        }
  
        if (!data.nextPageToken) {
          // setLoading(false); // All files are loaded
        }
      } catch (error) {
        console.error('Error fetching files:', error);
        // setLoading(false);
      }
    };
  
    useEffect(() => {
      if (initialLoad.current) {
        setFiles([]); // Clear previous files on initial load
        fetchFiles('', true); // Initial load
        initialLoad.current = false; // Mark initial load as done
      }
    }, [folder, googleAPIKey]);
  
    useEffect(() => {
      if (observer.current) {
        observer.current.disconnect();
      }
  
      const callback = (entries) => {
        if (entries[0].isIntersecting && pageToken) {
          console.log('Fetching more files...');
          setBatchLoading(true);
          // setTimeout(() => { 
            fetchFiles(pageToken);
          // }, 5000);
        }
      };
  
      observer.current = new IntersectionObserver(callback, {
        root: null,
        rootMargin: '2000px', // Trigger earlier
        threshold: 0.1
      });
      const target = document.querySelector('.load-more-trigger');
      if (target) {
        observer.current.observe(target);
      }
  
      return () => observer.current && observer.current.disconnect();
    }, [pageToken]);
  
    // - Handle image error
    // const handleImageError = (e) => {
    //   const src = e.target.src;
    //   const id = e.target.dataset.id;
  
    //   if (!retryCount.current[id]) {
    //     retryCount.current[id] = 0;
    //   }
  
    //   if (retryCount.current[id] < 10) { // Increased retry limit to 10
    //     retryCount.current[id] += 1;
    //     console.log(`Retrying to load image ${id}, attempt ${retryCount.current[id]}`);
    //     e.target.src = ''; // Clear the src to trigger a reload
    //     setTimeout(() => {
    //       e.target.src = src; // Retry loading the image
    //     }, 1000); // Retry after 1 seconds
    //   } else {
    //     console.error(`Failed to load image after 10 attempts: ${src}`);
    //   }
    // };

    // - Wait for images to load
    const waitForImagesToLoad = () => {
      return new Promise((resolve) => {
        const allImages = document.querySelectorAll('.img-container-photography-client img');
        let loadedImagesCount = 0;
  
        allImages.forEach(img => {
          img.onload = () => {
            loadedImagesCount += 1;
            console.log('Loaded images:', loadedImagesCount);
            if (loadedImagesCount === allImages.length) {
              console.log('All images loaded'); 
              resolve();
            }
          };
          img.onerror = () => {
            // loadedImagesCount += 1;
            if (loadedImagesCount === allImages.length) {
              console.error('Failed to load all images');
              resolve();
            }
          };
        });
      });
    };
  
    useEffect(() => {
      if (!loading) {
        waitForImagesToLoad().then(() => {
          setLoading(false);
        });
      }
    }, [files]);



    // - Modal
    const openModal = (index) => {
      setCurrentIndex(index);
      setCurrentImage(files[index]);
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
      setCurrentImage(null);
    };
  
    const nextImage = () => {
      const newIndex = (currentIndex + 1) % files.length;
      setCurrentIndex(newIndex);
      setCurrentImage(files[newIndex]);
    };
  
    const prevImage = () => {
      const newIndex = (currentIndex - 1 + files.length) % files.length;
      setCurrentIndex(newIndex);
      setCurrentImage(files[newIndex]);
    };


    // - Resize 
    useEffect(() => {
      const resizeAllGridItems = () => {
        const allItems = document.querySelectorAll('.img-container-photography-client');
        allItems.forEach(item => {
          const grid = document.querySelector('.photography-client-grid');
          const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
          const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));
          const rowSpan = Math.ceil((item.querySelector('img').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
          item.style.gridRowEnd = `span ${rowSpan}`;
        });
      };
  
      const allImages = document.querySelectorAll('.img-container-photography-client img');
      allImages.forEach(img => {
        img.onload = resizeAllGridItems;
      });
  
      window.addEventListener('resize', resizeAllGridItems);
      resizeAllGridItems();
  
      return () => window.removeEventListener('resize', resizeAllGridItems);
    }, [files]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      <div className={`row d-flex justify-content-center text-center mb-5`}> 
        <header className='photography-client-header col-12 d-flex justify-content-center align-items-center flex-column'>
          <h3>Placeholder for Title</h3>
          <p>Gergő Szakács</p>
        </header>
        <div className='photography-client-grid col-12 col-md-10 px-2'>
          {files.map((file, index) => {
            const imageUrl = `https://drive.google.com/thumbnail?sz=w1024&id=${file.id}`;
            const imageFallbackUrl = file.thumbnailLink.split('=')[0] + '=s1024';
            return (
              <motion.div 
                key={`${file.id}-${index}`} 
                className="img-container-photography-client"
                initial={{ opacity: 0 }}
                transition={{ duration: 1, easings: "easeOut" }}
                whileInView={{ opacity: 1 }}
                onClick={() => openModal(index)}
              >
                <img 
                  src={imageUrl} 
                  alt={file.name} 
                  data-id={file.id}
                  // fallback={(e) => e.target.src=imageFallbackUrl}
                  // loading="lazy"
                  // onError={handleImageError}  
                />
              </motion.div>
            );
          })}
        </div>
        {batchLoading && pageToken && <div>Loading more images...</div>}
        {pageToken && <div className="load-more-trigger" style={{ height: '1px' }}></div>}
      </div>


      {modalOpen && (
      <div className="modal" onClick={closeModal}>
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="arrow left" onClick={(e) => { e.stopPropagation(); prevImage(); }}>&#10094;</div>
        <div className="arrow right" onClick={(e) => { e.stopPropagation(); nextImage(); }}>&#10095;</div>
        <div className="modal-content">
          <img src={`https://drive.google.com/thumbnail?sz=w1024&id=${currentImage.id}`} alt={currentImage.name} />
        </div>
      </div>
    )}
    </div>
    );
} 

export default PhotographyClient;



// https://drive.google.com/thumbnail?id=1Hh2d2RvFx959Yz6nf9Cwh81fl1m7GKhv&