import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Main from './pages/main/Main';
import Layout from './layouts/Layout';
import Layout_MyPage from './layouts/Layout_MyPage';
import MyReviewList from './pages/mypage/MyReviewList';
import MyInfo from './pages/mypage/MyInfo';
import MyBusinessList from './pages/mypage/MyBusinessList';
import PointHistory from './pages/mypage/PointHistory';
import Bookmark from './pages/mypage/Bookmark';
import ChatHistory from './pages/mypage/ChatHistory';
import SelectLocation from './pages/location/SelectLocation';
import AdminMenu from './pages/admin/AdminMenu';
import MemberMenu from './pages/admin/member/MemberMenu';
import BusinessMenu from './pages/admin/business/BusinessMenu';
import TermsOfUse from './pages/global/TermsOfUse';
import PrivacyPolicy from './pages/global/PrivacyPolicy';
import SignUp from './pages/member/SignUp';
import PostDetail from './pages/post/PostDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/my_info' element={<Layout_MyPage/>}>
          <Route index element={<MyInfo/>}/>
        </Route>
        <Route path='/my_review_list' element={<Layout_MyPage/>}>
          <Route index element={<MyReviewList/>}/>
        </Route>
        <Route path='/point_history' element={<Layout_MyPage/>}>
          <Route index element={<PointHistory/>}/>
        </Route>
        <Route path='/bookmark' element={<Layout_MyPage/>}>
          <Route index element={<Bookmark/>}/>
        </Route>
        <Route path='/chat_history' element={<Layout_MyPage/>}>
          <Route index element={<ChatHistory/>}/>
        </Route>
        <Route path='/my_business_list' element={<Layout_MyPage/>}>
          <Route index element={<MyBusinessList/>}/>
        </Route>

        
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/select_location' element={<SelectLocation/>}/>
          <Route path='/admin_menu' element={<AdminMenu/>}/>
          <Route path='/member_menu' element={<MemberMenu/>}/>
          <Route path='/business_menu' element={<BusinessMenu/>}/>
          {/* <Route path='/postlist'>
            <Route index element={<PostList/>}/>
            <Route path=":id" element={<PostDetail/>}/>
          </Route> */}
          {/* <Route path='/postlist'> */}
            {/* <Route index element={<PostList/>}/> */}
            <Route path="/post_Detail" /*path=":id"*/  element={<PostDetail/>}/>
          {/* </Route> */}
          <Route path='/termsOfUse' element={<TermsOfUse/>}></Route>
          <Route path='/privacyPolicy' element={<PrivacyPolicy/>}></Route>
        </Route>

      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
