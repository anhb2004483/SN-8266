// Import các hàm từ Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBI8Dfptxa5q3G6_GB1KfJZjWgU0lWEiDI",
    authDomain: "espgas-d6120.firebaseapp.com",
    databaseURL: "https://espgas-d6120-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "espgas-d6120",
    storageBucket: "espgas-d6120.appspot.com",
    messagingSenderId: "577421708651",
    appId: "1:577421708651:web:cfc074f1ffb4761c45902e",
    measurementId: "G-ZRRBCE50GS"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Hàm để lấy và hiển thị dữ liệu từ Firebase
function getData() {
    const aaaRef = ref(database, 'aaa');

    onValue(aaaRef, (snapshot) => {
        const data = snapshot.val();
        document.getElementById('aaa').innerText = data !== null ? data : 'Không có dữ liệu';
    });
}

// Gọi hàm để lấy dữ liệu
getData();
