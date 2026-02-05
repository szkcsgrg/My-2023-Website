import React, { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion";

function AlternativeClient() {
    const googleAPIKey = process.env.REACT_APP_GOOGLE_API_KEY;
    //https://drive.google.com/drive/folders/1PJCW0lx5EDeUjvVU1omit4ZBHPdj5TJO?export=download
    //"https://drive.google.com/uc?id=1q3y_XkF57F_QQrrnA3Hgm-bI-mN9M8du&export=download"
    // const folder = '1PJCW0lx5EDeUjvVU1omit4ZBHPdj5TJO'; // Kati Tibi
    const folder = '1-E9DefxpYzJ4GYVKHTn3tJ4nRBzGH97b'; // Kati Tibi kozos
    // const folder = "1JfGJG2PPBkomieu5gwa_0oovjwvpLExy" // Nati Dugo
    // const folder = "1kSE0yiHGwaR6tciqyAfshUAR6-DTeDn-" //Laura David

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  // - Pagination
  const [loadedImages, setLoadedImages] = useState({});
  const [pageToken, setPageToken] = useState('');
  const observer = useRef();
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchFiles = async (pageToken = '') => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${folder}'+in+parents&key=${googleAPIKey}&fields=nextPageToken,files(id,name,thumbnailLink,webContentLink,webViewLink)&pageToken=${pageToken}&pageSize=50`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const filteredFiles = data.files.filter(file => !file.webViewLink.includes('/drive/'));
        setFiles(prevFiles => [...prevFiles, ...filteredFiles]);

        if (data.nextPageToken) {
            setPageToken(data.nextPageToken);
        } else {
            setPageToken('');
        }
    } catch (error) {
        console.error('Error fetching files:', error);
    }
};

  // - Fetch Files
  useEffect(() => {
    const loadImages = async () => {
        setLoading(true);
        await fetchFiles(pageToken);
        setLoading(false);
    };

    loadImages();
}, [pageToken, folder, googleAPIKey]);

  // - Resize All Images
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


  const handleImageLoad = (id) => {
    setLoadedImages(prevState => ({ ...prevState, [id]: true }));
  };

  const loadMoreImages = async () => {
      if (pageToken) {
          await delay(5000); // Wait for 5 seconds before loading the next batch
          await fetchFiles(pageToken);
      }
  };

  const lastImageElementRef = useRef();
    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && pageToken) {
                loadMoreImages();
            }
        });
        if (lastImageElementRef.current) observer.current.observe(lastImageElementRef.current);
    }, [loading, pageToken]);


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
                    console.log(`Loading image: ${imageUrl}`); // Log the URL
                    return (
                        <motion.div
                            key={`${file.id}-${index}`}
                            className="img-container-photography-client"
                            initial={{ opacity: 0 }}
                            transition={{ duration: 1, easings: "easeOut" }}
                            whileInView={{ opacity: 1 }}
                            ref={index === files.length - 1 ? lastImageElementRef : null}
                        >
                            <img
                                src={imageUrl}
                                alt={file.name}
                                data-id={file.id}
                                onLoad={() => handleImageLoad(file.id)}
                                onError={(e) => {
                                    console.error(`Error loading image with id ${file.id}:`, e);
                                    console.error(`Failed URL: ${imageUrl}`); // Log the failed URL
                                    handleImageLoad(file.id); // Mark as loaded to avoid infinite loading state
                                }}
                                style={{ display: loadedImages[file.id] ? 'block' : 'none' }}
                            />
                            {!loadedImages[file.id] && <div>Loading...</div>}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </div>
);
}

export default AlternativeClient