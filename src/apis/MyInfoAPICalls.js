import { request, requestWithToken, requestImageWithToken } from "./API.js";

export const getMemberInfoAPI = async (memberNo) => {
    try {
        const data = await requestWithToken('GET', `/mypage/my_info?memberNo=${memberNo}`);

        console.log(data);

        // data.results에 있는 멤버 정보를 변환
        const transformedData = {
            id: data.results.memberId || '',          // 수정된 부분: data.results.memberId
            nickname: data.results.memberNickname || '', // 수정된 부분: data.results.memberNickname
            name: data.results.memberName || '',      // 수정된 부분: data.results.memberName
            email: data.results.memberEmail || '',    // 수정된 부분: data.results.memberEmail
            phone: data.results.memberPhone || '',    // 수정된 부분: data.results.memberPhone
            birthDate: data.results.memberDob || '',  // 수정된 부분: data.results.memberDob
            zipcode: data.results.memberZipcode || '', // 수정된 부분: data.results.memberZipcode
            roadAddress: data.results.memberRoadAddress || '', // 수정된 부분: data.results.memberRoadAddress
            detailAddress: data.results.memberDetailAddress || '', // 수정된 부분: data.results.memberDetailAddress
        };

        return transformedData;
        // return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const updateMemberInfoAPI = async (memberNo, updatedForm) => {
    try {
        const response = await requestWithToken('PUT', `/mypage/my_info?memberNo=${memberNo}`, updatedForm);
        return response.data;
    } catch (error) {
        console.error('회원 정보 업데이트 에러: ', error);
        throw error;
    }
};

export const updateMemberProfilePicAPI = async (memberNo, updatedForm) => {
    try {
        const response = await requestImageWithToken('POST', `/mypage/my_info/profile_picture?memberNo=${memberNo}`, updatedForm);

        return response.data;
    } catch (error) {
        console.error('profile pic update 에러: ', error);
        throw error;
    }
}

export const changePasswordAPI = async (memberNo, passwordData) => {
    try {
        const response = await requestWithToken('POST', `/mypage/${memberNo}/change-password`, passwordData);
        
        // Return the full response object
        return response;
    } catch (error) {
        console.error('비밀번호 변경 에러: ', error);
        throw error;
    }
};

export const checkCurrentPasswordAPI = async (memberNo, currentPassword) => {
    try {
        const response = await requestWithToken('POST', `/mypage/${memberNo}/check-current-password`, { currentPassword });

        // 응답에서 isValid 속성을 확인하여 현재 비밀번호의 유효성을 반환
        if (response && response.data) {
            return response.data.isValid; // true/false 값을 반환
        } else {
            console.error('유효하지 않은 응답:', response);
            return false;
        }
    } catch (error) {
        console.error('현재 비밀번호 확인 에러: ', error);
        return false; // 에러 발생 시 false 반환
    }
};


export const getMyBusinessListAPI = async (memberNo) => {
    try {
        const response = await requestWithToken('GET', `/mypage/mybusinesslist?memberNo=${memberNo}`);

        // 데이터 구조 변환이 필요한 경우
        const transformedData = response.data.map(item => ({
            postNo: item.postNo || '',
            title: item.title || '',
            content: item.content || '',
            categoryName: item.categoryName || '',
            // ... 필요한 다른 필드들
        }));

        return transformedData;
    } catch (error) {
        console.error('내 업체 목록 조회 에러: ', error);
        throw error;
    }
}

export const getBusinessDetailAPI = async (postNo, memberNo) => {
    try {
        const response = await requestWithToken('GET', `/mypage/mybusinesslist/${postNo}?memberNo=${memberNo}`);

        // 데이터 구조 변환
        const transformedData = {
            postNo: response.data.postNo || '',
            title: response.data.title || '',
            content: response.data.content || '',
            categoryName: response.data.categoryName || '',
            subCategoryName: response.data.subCategoryName || '',
            // ... 다른 필드들
        };

        return transformedData;
    } catch (error) {
        console.error('업체 상세 정보 조회 에러: ', error);
        throw error;
    }
}

export const updateBusinessAPI = async (postNo, memberNo, postDTO, images) => {
    try {
        const formData = new FormData();
        formData.append('postDTO', JSON.stringify(postDTO));
        images.forEach(image => formData.append('images', image));
        formData.append('memberNo', memberNo);

        const response = await requestImageWithToken('PUT', `/mypage/mybusinesslist/${postNo}`, formData);
        return response.data;
    } catch (error) {
        console.error('업체 정보 수정 에러: ', error);
        throw error;
    }
}

export const deleteBusinessAPI = async (postNo, memberNo) => {
    try {
        await requestWithToken('DELETE', `/mypage/mybusinesslist/${postNo}?memberNo=${memberNo}`);
    } catch (error) {
        console.error('업체 삭제 에러: ', error);
        throw error;
    }
}

export const getMemberhasBusinessRegisteredAPI = async (memberNo) => {
    try {
        const data = await requestWithToken('GET', `/mypage/my_info?memberNo=${memberNo}`);

        console.log(data);

        // data.results에 있는 멤버 정보를 변환
        const transformedData = {
            id: data.results.memberId || '',          // 수정된 부분: data.results.memberId
            nickname: data.results.memberNickname || '', // 수정된 부분: data.results.memberNickname
            name: data.results.memberName || '',      // 수정된 부분: data.results.memberName
            email: data.results.memberEmail || '',    // 수정된 부분: data.results.memberEmail
            phone: data.results.memberPhone || '',    // 수정된 부분: data.results.memberPhone
            birthDate: data.results.memberDob || '',  // 수정된 부분: data.results.memberDob
            zipcode: data.results.memberZipcode || '', // 수정된 부분: data.results.memberZipcode
            roadAddress: data.results.memberRoadAddress || '', // 수정된 부분: data.results.memberRoadAddress
            detailAddress: data.results.memberDetailAddress || '', // 수정된 부분: data.results.memberDetailAddress
            hasBusinessRegistered: data.results.hasBusinessRegistered || '',
        };

        return transformedData;
        // return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};



