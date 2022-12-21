// 匯入 共用 API
import * as api from './api.js';
const userMenu = document.querySelector('#user-menu');



// 取出登入後的使用者 id
export function getLoggedID() {
    return localStorage.getItem('userId') || 0;
};


// 渲染會員選單
function templateOfUserMenu(user, template = '') {
    console.log(user);
    // console.log('me:::', JSON.stringify(user, null, 2));
    const isAdmin = user?.role === 'admin';
    if (isAdmin) {
        template = `
        <li class="nav-item mt-5 mt-lg-0">
            <a href="../admin/dashbaord.html" class="btn px-3 me-2">
              前往後台
            </a>
        </li>
      `;
    }
    /* end of IF-(isAdmin) */

    template += `
   <li class="nav-item mt-5 mt-lg-0">
   <div class="dropdown">
       <a class="nav-link" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
           aria-expanded="false">
           <div class="d-flex align-items-lg-center"> 
           <span class="material-icons-outlined">
           person
           </span>
           <strong class="d-none d-sm-block ms-1 px-1">
           ${user.name || 'HI!'}  您好!
           </strong>  
           </span>
           </div>
       </a>

       <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
           <li>
               <a class="dropdown-item" href="./my/bookmarks.html">收藏列表</a>
           </li>
           <li>
               <a class="dropdown-item" href="#" id="logout-btn">登出</a>
           </li>
       </ul>
   </div>
</li>
  `;

    return template;
};


// 取得會員資料
function getUserData() {
    const userId = getLoggedID();
    api.apiGetUserInfo(userId)
        .then(res => {
            if (res.status === 200) {
                console.log('OK!');
                document.querySelector('#guest-menu').classList.toggle('d-none');

                // 渲染使用者資料選單
                userMenu.innerHTML = templateOfUserMenu(res.data);
            }
        })
        .catch(error => {
            console.log(error);

            if (error?.response?.status === 401) {
                console.log('401');
                localStorage.clear();
            };

        });
};



// 會員登出功能
function logout(e) {
    // console.log(e.target);
    // console.log(e.target.id !== 'logout-btn');

    // 確認點擊到是否是登出按鈕
    if (e.target.id !== 'logout-btn') return;
    localStorage.clear();

    setTimeout(() => {
        window.location.replace('/');
    }, 300);
};

function init() {
    if (getLoggedID()) {
        getUserData();
    };

    userMenu.addEventListener('click', (e) => logout(e));
};
init();
