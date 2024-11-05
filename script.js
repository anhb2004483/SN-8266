// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2bRIDe_WmC4PrqNw0Pc3NmpB8RN49GlA",
    authDomain: "lvtn-1daf8.firebaseapp.com",
    databaseURL: "https://lvtn-1daf8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lvtn-1daf8",
    storageBucket: "lvtn-1daf8.firebasestorage.app",
    messagingSenderId: "714911677725",
    appId: "1:714911677725:web:077d406bd928413b3475f4",
    measurementId: "G-4QZ1WRMGW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Gửi dữ liệu khi nhấn nút
document.getElementById('submitBtn').addEventListener('click', () => {
    const bbb = document.getElementById('inputBbb').value;
    const messageElement = document.getElementById('message');

    if (bbb) {
        const dbRef = ref(database, 'SN1/bbb');
        set(dbRef, {
            value: bbb
        })
        .then(() => {
            messageElement.textContent = 'Dữ liệu đã được gửi thành công!';
            document.getElementById('inputBbb').value = ''; // Xóa input
        })
        .catch((error) => {
            messageElement.textContent = 'Đã xảy ra lỗi: ' + error;
        });
    } else {
        messageElement.textContent = 'Vui lòng nhập giá trị bbb.';
    }
});
