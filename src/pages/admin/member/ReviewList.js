import React, { useState } from 'react';
import './ReviewList.css';

const ReviewList = () => {
  const reviewsData = [
    { id: 1, place: "멍멍병원", count: 12, rating: 5.0 },
    { id: 2, place: "멍당카페", count: 20, rating: 4.5 },
    { id: 3, place: "멍멍미용실", count: 18, rating: 4.0 },
    { id: 4, place: "멍멍식당", count: 15, rating: 3.5 },
    { id: 5, place: "멍멍펜션", count: 16, rating: 4.5 },
    
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('최신순');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  
  const filteredReviews = reviewsData.filter(review =>
    review.place.includes(searchTerm)
  );

  
  const sortedReviews = filteredReviews.sort((a, b) => {
    if (sortOrder === '리뷰순') {
      return b.count - a.count;
    } else if (sortOrder === '평점순') {
      return b.rating - a.rating;
    } else {
      return b.id - a.id;
    }
  });

  
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);

  
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);

  return (
    <div className="review-list-container">
      <div className="search-bar">
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="최신순">최신순</option>
          <option value="리뷰순">리뷰순</option>
          <option value="평점순">평점순</option>
        </select>
        <input
          type="text"
          placeholder="장소명 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>검색</button>
      </div>

      <table className="review-list-table">
        <thead>
          <tr>
            <th>장소번호</th>
            <th>장소</th>
            <th>리뷰수</th>
            <th>평점</th>
            <th>리뷰 보기</th>
            <th>리뷰 작성/관리</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentReviews.map(review => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.place}</td>
              <td>{review.count}</td>
              <td>{review.rating}/5.0</td>
              <td><button className="view-button">리뷰 보기</button></td>
              <td><button className="manage-button">리뷰 작성/관리</button></td>
              <td><button className="delete-button">삭제</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          이전 페이지
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
};

export default ReviewList;
