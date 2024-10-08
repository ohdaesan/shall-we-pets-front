import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import './ReviewList.css';
import { getPostRegisterAPI } from '../../../apis/PostRegisterAPICalls';

const ReviewList = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('postNo'); // 초기값을 'postNo'로 설정
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const reviewsPerPage = 8;

  const fetchPosts = async () => {
    try {
      const postResponse = await getPostRegisterAPI({
        page: 0, // 모든 데이터를 가져오기 위해 페이지는 0
        size: 2000, // 적절한 최대값을 설정하여 모든 데이터를 가져옴
      });

      if (postResponse.results && postResponse.results.postList) {
        setPosts(postResponse.results.postList);
        setTotalPages(Math.ceil(postResponse.results.postList.length / reviewsPerPage)); // 전체 페이지 수 계산
        setDisplayedPosts(postResponse.results.postList.slice(0, reviewsPerPage)); // 첫 페이지 데이터
      }
    } catch (error) {
      console.error('데이터 가져오기 에러:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 데이터 검색 및 정렬 처리
  useEffect(() => {
    let filteredPosts = posts;

    // 검색어로 필터링
    if (searchTerm) {
      filteredPosts = filteredPosts.filter(post =>
        post.postDTO.fcltyNm.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 정렬 처리
    filteredPosts.sort((a, b) => {
      if (sortOrder === 'createdDate') {
        return new Date(b.createdDate) - new Date(a.createdDate);
      } else if (sortOrder === 'reviewCount') {
        return b.reviewCount - a.reviewCount;
      } else if (sortOrder === 'averageRate') {
        return b.averageRate - a.averageRate;
      } else if (sortOrder === 'postNo') { // postNo 기준 정렬 추가
        return b.postDTO.postNo - a.postDTO.postNo; // postNo가 큰 순서대로 정렬
      }
      return 0; // 기본값
    });

    // 현재 페이지에 맞는 데이터 설정
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    setDisplayedPosts(filteredPosts.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filteredPosts.length / reviewsPerPage)); // 필터링 후 전체 페이지 수 계산
  }, [posts, searchTerm, sortOrder, currentPage]);

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setCurrentPage(1); // 페이지를 1로 리셋
  };

  // 10개의 페이지 버튼을 표시하는 범위 계산
  const getPaginationRange = () => {
    let range = [];
    const totalButtons = 10; // 표시할 버튼 수
    let startPage = Math.max(1, currentPage - Math.floor(totalButtons / 2)); // 현재 페이지를 중심으로 시작 페이지 계산
    let endPage = Math.min(totalPages, startPage + totalButtons - 1); // 끝 페이지 계산

    // 시작 페이지가 1이 아닐 경우, 조정
    if (endPage - startPage < totalButtons - 1) {
      startPage = Math.max(1, endPage - totalButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return range;
  };

  // 리뷰 관리 버튼 클릭 시 페이지 이동
  const handleManageClick = (postNo) => {
    navigate(`/postlist/post/${postNo}`); // 해당 postNo로 이동
  };

  return (
    <div className="review-list-container">
      <div className="search-bar">
        <select onChange={(e) => handleSortChange(e.target.value)} value={sortOrder}>
          <option value="postNo">등록 최신순</option> {/* 포스트 번호 기준 정렬 추가 */}
          <option value="reviewCount">리뷰순</option>
          <option value="averageRate">평점순</option>
        </select>
        <input
          type="text"
          placeholder="장소명 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => { setCurrentPage(1); }}>검색</button>
      </div>

      <table className="review-list-table">
        <thead>
          <tr>
            <th>장소번호</th>
            <th>장소</th>
            <th>리뷰수</th>
            <th>평점</th>
            <th>리뷰 관리</th>
          </tr>
        </thead>
        <tbody>
          {displayedPosts.map((post) => (
            <tr key={post.postDTO.postNo}>
              <td>{post.postDTO.postNo}</td>
              <td>{post.postDTO.fcltyNm}</td>
              <td>{post.reviewCount}</td>
              <td>{post.averageRate.toFixed(1)}/5.0</td> {/* 평점 소수점 1째 자리까지만 표시 */}
              <td>
                <button className="manage-button" onClick={() => handleManageClick(post.postDTO.postNo)}>리뷰 관리</button>
              </td>
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

        {getPaginationRange().map((page) => (
          <button
            key={page}
            className={currentPage === page ? 'active' : ''}
            onClick={() => setCurrentPage(page)}
          >
            {page}
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
