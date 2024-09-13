import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Main from './pages/main/Main';
import Layout from './layouts/Layout';
import Layout_MyPage from './layouts/Layout_MyPage';
import MyReviewList from './pages/mypage/MyReviewList';
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
import MyInfo from './pages/mypage/MyInfo';
import ChangePassword from './pages/mypage/ChangePassword';
import DeleteAccount from './pages/mypage/DeleteAccount';
import MyBusinessDetail from './pages/mypage/MyBusinessDetail';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='mypage/my_info' element={<Layout_MyPage/>}>
          <Route index element={<MyInfo/>}/>
        </Route>
        <Route path='mypage/my_review_list' element={<Layout_MyPage/>}>
          <Route index element={<MyReviewList/>}/>
        </Route>
        <Route path='mypage/pointhistory' element={<Layout_MyPage/>}>
          <Route index element={<PointHistory/>}/>
        </Route>
        <Route path='mypage/bookmark' element={<Layout_MyPage/>}>
          <Route index element={<Bookmark/>}/>
        </Route>
        <Route path='mypage/chat_history' element={<Layout_MyPage/>}>
          <Route index element={<ChatHistory/>}/>
        </Route>
        <Route path='mypage/business_list' element={<Layout_MyPage/>}>
          <Route index element={<MyBusinessList/>}/>
        </Route>
        <Route path='mypage/changepassword' element={<Layout_MyPage/>}>
          <Route index element={<ChangePassword/>}/>
        </Route>
        <Route path='deleteaccount' element={<Layout_MyPage/>}>
          <Route index element={<DeleteAccount/>}/>
        </Route>
        <Route path='mypage/my_mybusinessdetail' element={<Layout_MyPage/>}>
          <Route index element={<MyBusinessDetail/>}/>
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
          <Route path='/termsOfUse' element={<TermsOfUse/>}></Route>
          <Route path='/privacyPolicy' element={<PrivacyPolicy/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
