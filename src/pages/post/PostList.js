import React, { useState } from 'react';
import './PostList.css';
import marking from '../../images/marking.png';
import cityPhoto from '../../images/seoul.png'
import img1 from '../../images/2 2.png'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import searching from '../../images/Search.png';

function PostList() {
    return (
        <>
            <div className='content-postList-1'>
                <div className='listContentHeader'>
                    <div className='left-section'>
                        <div className='seletedCity'>
                            <img src={marking}></img>
                            <div className='cityName'>서울특별시</div>
                        </div>
                        <div className='selected-category'>반려동물서비스</div>
                        <div className='select-detail-location'>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    지역선택 (시,군,구)
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">강남구</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">은평구</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">광진구</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='seleted-city-photo'>
                        <img src={cityPhoto}></img>
                    </div>
                </div>

                <div className="searhcing">
                    <input
                        type="text"
                        placeholder="검색할 단어를 입력해주세요"
                        className="searching-bar"
                    />
                    <img src={searching} alt="Search icon" />
                </div>



                <div className='listContent'>
                    <div className='posts'>
                        <div className='post1'>
                            <div className='listInfo-details'>
                                <div className='listInfo-name'>331멍팔소</div>
                                <div className='listInfo-category'>반려동물 서비스</div>
                                <div className='listInfo-address'>서울시 강남구 역삼동 724-45</div>
                            </div>
                            <div className='listInfo-images'>
                                <img src={img1} alt="Image 1" />
                                <img src={img1} alt="Image 2" />
                                <img src={img1} alt="Image 3" />
                                <img src={img1} alt="Image 4" />

                            </div>
                        </div>
                        <div className='post2'>
                            <div className='listInfo-details'>
                                <div className='listInfo-name'>331멍팔소</div>
                                <div className='listInfo-category'>반려동물 서비스</div>
                                <div className='listInfo-address'>서울시 강남구 역삼동 724-45</div>
                            </div>
                            <div className='listInfo-images'>
                            <img src={img1} alt="Image 1" />
                                <img src={img1} alt="Image 2" />
                                <img src={img1} alt="Image 3" />
                                <img src={img1} alt="Image 4" />
                            </div>
                        </div>
                        <div className='post3'>
                            <div className='listInfo-details'>
                                <div className='listInfo-name'>331멍팔소</div>
                                <div className='listInfo-category'>반려동물 서비스</div>
                                <div className='listInfo-address'>서울시 강남구 역삼동 724-45</div>
                            </div>
                            <div className='listInfo-images'>
                            <img src={img1} alt="Image 1" />
                                <img src={img1} alt="Image 2" />
                                <img src={img1} alt="Image 3" />
                                <img src={img1} alt="Image 4" />
                            </div>
                        </div>
                        <div className='post4'>
                            <div className='listInfo-details'>
                                <div className='listInfo-name'>331멍팔소</div>
                                <div className='listInfo-category'>반려동물 서비스</div>
                                <div className='listInfo-address'>서울시 강남구 역삼동 724-45</div>
                            </div>
                            <div className='listInfo-images'>
                            <img src={img1} alt="Image 1" />
                                <img src={img1} alt="Image 2" />
                                <img src={img1} alt="Image 3" />
                                <img src={img1} alt="Image 4" />
                            </div>
                        </div>


                    </div>
                </div>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-2" aria-label="First group">
                        <Button>1</Button> <Button>2</Button> <Button>3</Button>{' '}
                        <Button>4</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div >

        </>
    );
}

export default PostList;