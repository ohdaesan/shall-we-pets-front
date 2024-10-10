import React, { useEffect, useState } from 'react';
import './Bookmark.css';
import reviewPic1 from '../../images/reviewpic.jpg';
import { memberBookmarkAPI } from '../../apis/BookmarkAPICalls';
import { getPostDetailAPI } from '../../apis/PostAPICalls';
import { getPostImageByPostNoAPI } from '../../apis/ImagesAPICalls';

const Bookmark = () => {
    const [storeData, setStoreData] = useState([]); // API로부터 받아온 북마크 데이터
    const [currentImageIndices, setCurrentImageIndices] = useState({});

    // 북마크 데이터 불러오기
    useEffect(() => {
        const fetchBookmarkData = async () => {
            try {
                const memberNo = localStorage.getItem('memberNo');
                const data = await memberBookmarkAPI(memberNo);
                const bookmarks = data.results.bookmarks;


                // 각 북마크의 postNo를 사용해 세부 정보 및 이미지를 가져옴
                const detailedDataPromises = bookmarks.map(async (bookmark) => {
                    const postDetail = await getPostDetailAPI(bookmark.postNo);
                    const post = postDetail.results.post;

                    // 이미지 불러오기
                    const postImages = await getPostImageByPostNoAPI(post.postNo, 1);
                    console.log(postImages);

                    const images = postImages && postImages.results && postImages.results.postImageList && postImages.results.postImageList.length > 0
                        ? postImages.results.postImageList.map(img => img.imageUrl)
                        : [reviewPic1];

                    return {
                        id: post.postNo,
                        name: post.fcltyNm,
                        address: post.rdnmadrNm,
                        images
                    };

                });

                const detailedData = await Promise.all(detailedDataPromises);


                setStoreData(detailedData);

                // 이미지 인덱스 초기값 설정
                const initialIndices = {};
                detailedData.forEach(store => {
                    initialIndices[store.id] = 0;
                });
                setCurrentImageIndices(initialIndices);
            } catch (error) {
                console.error('북마크 데이터를 불러오는 중 오류 발생:', error);
            }
        };

        fetchBookmarkData();
    }, []);

    // 이전 이미지로 이동
    const handlePreviousClick = (storeId) => {
        setCurrentImageIndices(prevIndices => ({
            ...prevIndices,
            [storeId]: Math.max(0, prevIndices[storeId] - 1)
        }));
    };

    // 다음 이미지로 이동
    const handleNextClick = (storeId, imagesLength) => {
        setCurrentImageIndices(prevIndices => ({
            ...prevIndices,
            [storeId]: Math.min(imagesLength - 1, prevIndices[storeId] + 1)
        }));
    };

    return (
        <div className="bookmark-container">
            <h2 className="bookmark-title">내가 저장한 장소 조회</h2>
            <div className="bookmark-container-main">
                <div className="bookmark-list">
                    {storeData.map((store) => (
                        <div key={store.id} className="bookmark-storeCard">
                            <div className="bookmark-storeImage">
                                <button
                                    className="bookmark-prevButton"
                                    onClick={() => handlePreviousClick(store.id)}
                                    disabled={currentImageIndices[store.id] === 0}
                                >
                                    ‹
                                </button>
                                <img
                                    src={store.images[currentImageIndices[store.id]]}
                                    alt={store.name}
                                />
                                <button
                                    className="bookmark-nextButton"
                                    onClick={() => handleNextClick(store.id, store.images.length)}
                                    disabled={currentImageIndices[store.id] === store.images.length - 1}
                                >
                                    ›
                                </button>
                            </div>
                            <div className="bookmark-storeInfo">
                                <h3 className="bookmark-storeName">{store.name}</h3>
                                <p className="bookmark-storeAddress">{store.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bookmark;
