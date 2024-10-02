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