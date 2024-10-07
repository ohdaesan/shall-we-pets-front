import axios from 'axios';

const DOMAIN = 'http://localhost:8080';

export const request = async (method, url, data) => {
    return await axios({
          method,
          url : `${DOMAIN}${url}`,
          data
    })
    .then(res => res.data)
    .catch(error => console.log(error));
};

export const requestChangePwd = async (method, url, data) => {
    return await axios({
        method,
        url : `${DOMAIN}${url}`,
        data
    })
    .then(res => res.data)
    .catch(error => error.response);
};

export const requestImage = async (method, url, data) => {
    return await axios({
        method,
        url : `${DOMAIN}${url}`,
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then(res => res.data)
    .catch(error => console.log(error))
};

// 로그인 되어있을 때만 가능한 기능 사용 시 헤더에 토큰 담아서 보내기
export const requestWithToken = async (method, url, data) => {
    // Axios 요청 실행
    return await axios({
        method,
        url: `${DOMAIN}${url}`,
        data: data instanceof FormData ? data : JSON.stringify(data), // FormData일 경우 그대로, 아니면 JSON 문자열로 변환
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json', // Content-Type 설정
        },
    })
    .then(res => res.data) // 응답 데이터 반환
    .catch(error => {
        console.error('API 요청 오류:', error); // 오류 로그 출력
        throw error; // 오류 던지기
    });
};

export const requestImageWithToken = async (method, url, data) => {
    return await axios({
        method,
        url : `${DOMAIN}${url}`,
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem('token'),
        },
    })
    .then(res => res.data)
    .catch(error => console.log(error))
};