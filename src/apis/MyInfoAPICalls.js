import { request, requestWithToken, requestImageWithToken } from "./API.js";

export const getMemberInfoAPI = async (memberNo) => {
    try {
        const data = await requestWithToken('GET', `/mypage/my_info?memberNo=${memberNo}`);


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

export const registerBusinessAPI = async (memberNo, postDTO, images) => {
    const formData = new FormData();

    // postDTO의 각 필드를 개별적으로 FormData에 추가
    Object.keys(postDTO).forEach(key => {
        formData.append(key, postDTO[key]);
    });

    // memberNo를 postDTO에 포함시키지 않고 별도로 추가
    formData.append('memberNo', memberNo);

    // 이미지 파일 추가
    images.forEach((image, index) => {
        formData.append(`images`, image);
    });

    try {
        const response = await requestWithToken('POST', '/mypage/businessregister', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        // 에러 처리 로직은 그대로 유지
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    throw new Error(error.response.data.message || '잘못된 요청입니다.');
                case 401:
                    throw new Error('인증에 실패했습니다. 다시 로그인해주세요.');
                case 500:
                    throw new Error(error.response.data.message || '서버 오류가 발생했습니다.');
                default:
                    throw new Error('알 수 없는 오류가 발생했습니다.');
            }
        } else if (error.request) {
            throw new Error('서버에서 응답이 없습니다.');
        } else {
            throw new Error('요청 설정 중 오류가 발생했습니다.');
        }
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

