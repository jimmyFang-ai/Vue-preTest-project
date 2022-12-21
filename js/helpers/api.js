// 引入 axios 
import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";


//  本地端
const BASE_URL = `http://localhost:10000`;

// Render
// const DOMAINS = `https://vue-pretest-json-server-auth.onrender.com`;

// user 使用者
const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});


// 管理者
const adminRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});




// 測試有登入後 將 token 取出來，在所有的headers ['Authorization'] 加入 token
userRequest.interceptors.request.use(
    (config) => {
        // 從 localStorage 將 token 取出
        const token = localStorage.getItem('token');

        // 如果 token 存在的話，則帶入到 headers 當中
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err),
);



// 課程資訊 API(不用登入)
// 所有課程資料
export const apiGetSpots = () => userRequest.get('/spots');
// 單一課程資料
export const apiGetSpot = (id) => userRequest.get(`/spots/${id}`);




// 註冊
export const apiSignup = (data) => userRequest.post('/signup', data);
// // 登入
export const apiLogin = (data) => userRequest.post('/login', data);
// // 取的使用者資訊(需要登入，有權限)
export const apiGetUserInfo = (id) => userRequest.get(`/600/users/${id}`);



// // 收藏 API (需登入)
// 取得所有收藏資料
export const apiGetBookmarks = (userId) => userRequest.get(`/600/users/${userId}/bookmarks?_expand=spot`);
// // 取得單一收藏資料
export const apiGetBookmark = (userId, id) => userRequest.get(`/600/users/${userId}/bookmarks?spotId=${id}`);
// // 新增收藏
export const apiAddBookmarks = (id, data) => userRequest.post(`/600/spot/${id}/bookmarks`, data);
// // 移除單筆收藏
export const apiRemoveBookmarks = (id) => userRequest.delete(`/600/bookmarks/${id}`);



// 景點 (後台權限)
// 取得所有景點(路由代碼:664 ， 寫入有 token 皆可，讀取不用 token)
export const apiAdminGetSpot = () => adminRequest.get('/664/spots');
// 移除單筆景點(路由代碼:664 ， 寫入有 token 皆可，讀取不用 token)
export const apiAdminRemoveSpot = (id) => adminRequest.delete(`/664/spots/${id}`);


