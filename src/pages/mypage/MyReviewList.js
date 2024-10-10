import React, { useEffect, useState } from 'react';
import './MyReviewList.css';
import reviewPic1 from '../../images/reviewpic.jpg';
import reviewPic2 from '../../images/reviewpic2.jpg';
import reviewPic3 from '../../images/reviewpic3.jpg';
import reviewPic4 from '../../images/reviewpic4.jpg';
import reviewPic5 from '../../images/reviewpic5.jpg';
import reviewPic6 from '../../images/reviewpic6.jpg';
import { getReviewsByMemberNo } from '../../apis/ReviewAPICalls';

const MyReviewList = () => {
    const [reviewsWithImages, setReviewsWithImages] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const memberNo = localStorage.getItem('memberNo');
                if (!memberNo) {
                    console.error('Member number not found in localStorage');
                    return;
                }
                const response = await getReviewsByMemberNo(memberNo);
                console.log("뭘 담고있지?",response)
                
                if (response.results === 200 && response.results) {
                    setReviewsWithImages(response.results);
                }
            } catch (error) {
                console.error('Failed to load reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="myreviewlist-reviewContainer">
            <h2 className="myreviewlist-reviewTitle">내 리뷰 목록</h2>
            <div className="myreviewlist-reviewBox">
                {reviewsWithImages.map(({ review, reviewImages }) => (
                    <div key={review.reviewNo} className="myreviewlist-reviewCard">
                        <div className="myreviewlist-reviewHeader">
                            <h3 className="myreviewlist-storeName">게시물 번호: {review.postNo}</h3>
                            <div className="myreviewlist-ratingAndDate">
                                <span className="myreviewlist-rating">
                                    {'⭐'.repeat(review.rate)} {review.rate}점
                                </span>
                                <span className="myreviewlist-date">
                                    {new Date(review.createdDate).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        {reviewImages && reviewImages.length > 0 && (
                            <div className="myreviewlist-reviewImages">
                                {reviewImages.map((reviewImage) => (
                                    <img
                                        key={reviewImage.reviewImageNo}
                                        src={`/api/images/${reviewImage.imageNo}`}
                                        alt={`Review ${reviewImage.reviewImageNo}`}
                                        className="myreviewlist-reviewImage"
                                    />
                                ))}
                            </div>
                        )}
                        <p className="myreviewlist-reviewContent">{review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyReviewList;