import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import './PostList.css';
import PostListForm from '../../components/form/PostListForm';

function PostList() {
    const location = useLocation();

    // URL 쿼리 파라미터에서 'city'와 'category' 값을 추출
    const queryParams = new URLSearchParams(location.search);
    const city = decodeURIComponent(queryParams.get('city'));
    const category = decodeURIComponent(queryParams.get('category'));

    // city나 category가 선택되지 않은 상태에서 페이지 접속 시 카테고리 선택 페이지로 navigate
    if(city.toString() === "null" || category.toString() === "null") {
        return <Navigate to="/selectCategory" replace={ true }/>
    } else {
        return (
            <>
                <PostListForm/>
            </>
        );
    }
}

export default PostList;
