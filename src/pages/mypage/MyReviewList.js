import React, { useState } from 'react';
import './MyReviewList.css';
import reviewPic1 from '../../images/reviewpic.jpg';
import reviewPic2 from '../../images/reviewpic2.jpg';
import reviewPic3 from '../../images/reviewpic3.jpg';
import reviewPic4 from '../../images/reviewpic4.jpg';
import reviewPic5 from '../../images/reviewpic5.jpg';
import reviewPic6 from '../../images/reviewpic6.jpg';

const MyReviewList = () => {
    const reviews = [
        {
            id: 1,
            storeName: '펫맹펫맹 하우스',
            rating: 5,
            date: '2024.06.13',
            content: '강아지집, 빵석, 장난감 등등 다 갖춰져 있고 커피머신, 에어프라이어에 얼음도 냉동실에 넉넉하게 얼려져 있어요! 사장님 부부 모두 친절하시고 친구 등 모두 깨끗했어요. 조용하게 휴식 취하면서 댕댕이들 안전하게 놀 곳 찾으시는 분들께 강추합니다.',
            images: [reviewPic1, reviewPic2, reviewPic3, reviewPic4, reviewPic5, reviewPic6],
        },
        {
            id: 2,
            storeName: '펫맹펫맹 하우스',
            rating: 3,
            date: '2024.06.13',
            content: '강아지집, 빵석, 장난감 등등 다 갖춰져 있고 커피머신, 에어프라이어에 얼음도 냉동실에 넉넉하게 얼려져 있어요! 사장님 부부 모두 친절하시고 친구 등 모두 깨끗했어요. 조용하게 휴식 취하면서 댕댕이들 안전하게 놀 곳 찾으시는 분들께 강추합니다.',
            images: [reviewPic1, reviewPic2, reviewPic3, reviewPic4, reviewPic5],
        },
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePreviousClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    const handleNextClick = (images) => {
        setCurrentImageIndex((prevIndex) => {
            if (prevIndex < images.length - 4) {
                return prevIndex + 1;
            }
            return prevIndex; // 마지막 4장일 경우 인덱스를 증가시키지 않음
        });
    };

    return (
        <div>
            <h1>내 리뷰 리스트</h1>
        </div>
    );

}

export default MyReviewList;