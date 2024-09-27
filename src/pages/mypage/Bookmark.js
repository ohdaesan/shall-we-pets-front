import React, { useEffect, useState } from 'react';
import './Bookmark.css';
import reviewPic1 from '../../images/reviewpic.jpg';
import reviewPic2 from '../../images/reviewpic2.jpg';
import reviewPic3 from '../../images/reviewpic3.jpg';
import reviewPic4 from '../../images/reviewpic4.jpg';
import reviewPic5 from '../../images/reviewpic5.jpg';
import reviewPic6 from '../../images/reviewpic6.jpg';

const Bookmark = () => {
    const [storeData, setStoreData] = useState([]);
    const [currentImageIndices, setCurrentImageIndices] = useState({});

    useEffect(() => {
        const initialData = [
            {
                id: 1,
                name: '쉘위펫즈',
                address: '강원도 홍천군 홍천로 189-23',
                images: [ reviewPic1, reviewPic2, reviewPic3 ],
            },
            {
                id: 2,
                name: '쉘위펫즈 2호점',
                address: '강원도 홍천군 홍천로 189-25',
                images: [reviewPic4, reviewPic5, reviewPic6],
            },
            {
                id: 3,
                name: '쉘위펫즈 3호점',
                address: '강원도 홍천군 홍천로 189-23',
                images: [reviewPic4, reviewPic5, reviewPic6],
            },
            {
                id: 4,
                name: '쉘위펫즈',
                address: '강원도 홍천군 홍천로 189-23',
                images: [reviewPic4, reviewPic5, reviewPic6],
            },
            {
                id: 5,
                name: '쉘위펫즈',
                address: '강원도 홍천군 홍천로 189-23',
                images: [reviewPic4, reviewPic5, reviewPic6],
            },
            {
                id: 6,
                name: '쉘위펫즈',
                address: '강원도 홍천군 홍천로 189-23',
                images: [reviewPic4, reviewPic5, reviewPic6],
            },
        ];
        setStoreData(initialData);
        
        const initialIndices = {};
        initialData.forEach(store => {
            initialIndices[store.id] = 0;
        });
        setCurrentImageIndices(initialIndices);
    }, []);

    const handlePreviousClick = (storeId) => {
        setCurrentImageIndices(prevIndices => ({
            ...prevIndices,
            [storeId]: Math.max(0, prevIndices[storeId] - 1)
        }));
    };

    const handleNextClick = (storeId, imagesLength) => {
        setCurrentImageIndices(prevIndices => ({
            ...prevIndices,
            [storeId]: Math.min(imagesLength - 1, prevIndices[storeId] + 1)
        }));
    };

    return (
        <div>
            <h1>저장한 장소 목록</h1>
        </div>
    );
};

export default Bookmark;