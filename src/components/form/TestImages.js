import { useEffect, useState } from "react";
import { findImageByImageNoAPI, deleteImageByImageNoAPI } from "../../apis/ImagesAPICalls";

export function TestShowImage() {
    const [s3image, setS3Image] = useState(null);

    const getImageByImageNo = async () => {
        try {
            const response = await findImageByImageNoAPI(26);
            setS3Image(response.results.image.imageUrl);
        } catch (error) {
            console.error('이미지 찾아오기 실패: ', error);
        }
    };

    const deleteImageByImageNo = async () => {
        try {
            const response = await deleteImageByImageNoAPI(26);
            console.log("response", response);

        } catch (error) {
            console.error('이미지 삭제 실패: ', error);
        }
    };

    // useEffect(() => {
    //     getImageByImageNo();
    // }, [deleteImageByImageNo]);

    return (
        <>
            <button onClick={getImageByImageNo}>이미지 가져오기</button>
            {s3image && <img src={s3image} alt="S3에서 가져온 이미지" />}<br/><br/>
            {/* <button onClick={deleteImageByImageNo}>이미지 삭제하기</button> */}
        </>
    );
}
