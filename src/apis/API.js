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
    return await axios({
        method,
        url : `${DOMAIN}${url}`,
        data,
        headers: {
            'Authorization': localStorage.getItem('token'),
        },
    })
    .then(res => res.data)
    .catch(error => console.log(error))
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