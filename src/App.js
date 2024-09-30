import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Main from './pages/main/Main';
import Layout from './layouts/Layout';
import Layout_MyPage from './layouts/Layout_MyPage';
import MyReviewList from './pages/mypage/MyReviewList';
import MyBusinessList from './pages/mypage/MyBusinessList';
import BusinessRegister from './pages/mypage/BusinessRegister';
import PointHistory from './pages/mypage/PointHistory';
import Bookmark from './pages/mypage/Bookmark';
import ChatHistory from './pages/mypage/ChatHistory';
import SelectLocation from './pages/location/SelectLocation';
import AdminMenu from './pages/admin/AdminMenu';
import MemberMenu from './pages/admin/member/MemberMenu';
import BusinessMenu from './pages/admin/business/BusinessMenu';
import TermsOfUse from './pages/global/TermsOfUse';
import PrivacyPolicy from './pages/global/PrivacyPolicy';
import MemberList from './pages/admin/member/MemberList';
import MemberDetail from './pages/admin/member/MemberDetail';
import SignUp from './pages/member/SignUp';
import MyInfo from './pages/mypage/MyInfo';
import ChangePassword from './pages/mypage/ChangePassword';
import DeleteAccount from './pages/mypage/DeleteAccount';
import Login from './pages/member/Login';
import Layout_bg from './layouts/Layout_bg';
import FindId from './pages/member/FindId';
import PostDetail from './pages/post/PostDetail';
import FindPwd from './pages/member/FindPwd';
import PointDetail from './pages/admin/member/PointDetail'
import PointList from './pages/admin/member/PointList';
import AppliedList from './pages/admin/business/AppliedList';
import BusinessList from './pages/admin/business/BusinessList';
import PostList from './pages/post/PostList';
import SelectCategory from './pages/main/SelectCategory';
import ReviewList from './pages/admin/member/ReviewList';
import SelectCity from './pages/main/SelectCity';
import ApplyDetail from './pages/admin/business/ApplyDetail';
import BusinessDetail from './pages/admin/business/BusinessDetail';
import Map from './pages/location/Map';
import ChangePwdNotLoggedIn from './pages/member/ChangePwdNotLoggedIn';
import ChatApp from './pages/chat/ChatApp';

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
        <Route path='mypage/mybusinesslist' element={<Layout_MyPage/>}>
          <Route index element={<MyBusinessList/>}/>
        </Route>
        <Route path='mypage/changepassword' element={<Layout_MyPage/>}>
          <Route index element={<ChangePassword/>}/>
        </Route>
        <Route path='deleteaccount' element={<Layout_MyPage/>}>
          <Route index element={<DeleteAccount/>}/>
        </Route>
        <Route path='mypage/businessregister' element={<Layout_MyPage/>}>
          <Route index element={<BusinessRegister/>}/>
        </Route>
        <Route path='mypage/myreviewlist' element={<Layout_MyPage/>}>
          <Route index element={<MyReviewList/>}/>
        </Route>
        {/* <Route path='mypage/mysavedplace' element={<Layout_MyPage/>}>
          <Route index element={<MySavedPlace/>}/>
        </Route> */}
        
        <Route path='/member/login' element={<Layout_bg/>}>
          <Route index element={<Login/>}/>
        </Route>

        <Route path='/' element={<Layout_bg/>}>
          <Route index element={<Main/>}/>
          <Route path='/selectCategory' element={<SelectCategory/>}/>
          <Route path='/selectCity' element={<SelectCity/>}/>
        </Route>
        
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path='member/register' element={<SignUp/>}/>
          <Route path='member/findid' element={<FindId/>}/>
          <Route path='member/findpwd' element={<FindPwd/>}/>
          <Route path='/select_location' element={<SelectLocation/>}/>
          <Route path='/admin_menu' element={<AdminMenu/>}/>
          <Route path='/member_menu' element={<MemberMenu/>}/>
          <Route path='/business_menu' element={<BusinessMenu/>}/>
          <Route path="/point_detail" element={<PointDetail/>}/>
          <Route path='/member_list' element={<MemberList/>}/>
          <Route path='/member_detail' element={<MemberDetail/>}/>
          <Route path='/point_list' element={<PointList/>}/>
          <Route path='/review_list' element={<ReviewList/>}/>
          <Route path='/apply_detail' element={<ApplyDetail/>}/>
          <Route path='/business_detail' element={<BusinessDetail/>}/>
          <Route path='/applied_list' element={<AppliedList/>}/>
          <Route path='/business_list' element={<BusinessList/>}/>

          {/* </Route> */}
          <Route path='/termsOfUse' element={<TermsOfUse/>}></Route>
          <Route path='/privacyPolicy' element={<PrivacyPolicy/>}></Route>
        </Route>

          {/* post라우터들 */}
          <Route path='/postlist' element={<Layout />}>
          <Route index element={<PostList />} />
          <Route path='post/:postNo' element={<PostDetail />} />
          <Route path='chat' element={<ChatApp/>}>
          </Route>
        </Route>

          {/* </Route> */}
          <Route path='/termsOfUse' element={<TermsOfUse/>}></Route>
          <Route path='/privacyPolicy' element={<PrivacyPolicy/>}></Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
