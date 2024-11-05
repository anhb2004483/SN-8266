// Import các hàm cần thiết từ SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

// Cấu hình Firebase
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

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Tham chiếu các phần tử trong bảng
const snRefs = {
    SN1: {
        object: document.getElementById('sn1-object-data'),
        gas: document.getElementById('sn1-gas-data'),
        gasThreshold: document.getElementById('sn1-gas-threshold-data'),
        tempThreshold: document.getElementById('sn1-temp-threshold-data'),
        khancap: document.getElementById('sn1-khancap-data')
    },
    SN2: {
        object: document.getElementById('sn2-object-data'),
        gas: document.getElementById('sn2-gas-data'),
        gasThreshold: document.getElementById('sn2-gas-threshold-data'),
        tempThreshold: document.getElementById('sn2-temp-threshold-data'),
        khancap: document.getElementById('sn2-khancap-data')
    },
    SN3: {
        object: document.getElementById('sn3-object-data'),
        gas: document.getElementById('sn3-gas-data'),
        gasThreshold: document.getElementById('sn3-gas-threshold-data'),
        tempThreshold: document.getElementById('sn3-temp-threshold-data'),
        khancap: document.getElementById('sn3-khancap-data')
    },
    SN4: {
        object: document.getElementById('sn4-object-data'),
        gas: document.getElementById('sn4-gas-data'),
        gasThreshold: document.getElementById('sn4-gas-threshold-data'),
        tempThreshold: document.getElementById('sn4-temp-threshold-data'),
        khancap: document.getElementById('sn4-khancap-data')
    }
};

// Hàm lấy và hiển thị dữ liệu cho từng sensor
const fetchDataForSensor = (sensorKey, refs) => {
    onValue(ref(database, `${sensorKey}/object`), (snapshot) => {
        refs.object.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorKey}/gas`), (snapshot) => {
        refs.gas.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorKey}/Gas_threshold`), (snapshot) => {
        refs.gasThreshold.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorKey}/Temp_threshold`), (snapshot) => {
        refs.tempThreshold.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorKey}/khancap`), (snapshot) => {
        if (snapshot.exists()) {
            const khancapValue = snapshot.val();
            if (khancapValue === -1) {
                refs.khancap.textContent = 'OFF';
            } else if (khancapValue === -2) {
                refs.khancap.textContent = 'ON';
            } else {
                refs.khancap.textContent = khancapValue; 
            }
        } else {
            refs.khancap.textContent = 'N/A'; 
        }
    });
};

// Gọi hàm lấy dữ liệu cho từng sensor
Object.keys(snRefs).forEach(sensorKey => fetchDataForSensor(sensorKey, snRefs[sensorKey]));

// Đăng nhập
const loginButton = document.getElementById('login-button');
const loginMessage = document.getElementById('login-message');

loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userRef = ref(database, 'user');

    onValue(userRef, (snapshot) => {
        const userData = snapshot.val();

        if (userData) {
            const dbUsername = userData.username;
            const dbPassword = userData.password;

            if (username === dbUsername && password === dbPassword) {
                loginMessage.textContent = 'Đăng nhập thành công!';
                document.getElementById('login-container').style.display = 'none'; // Ẩn phần đăng nhập
                document.getElementById('data-container').style.display = 'block'; // Hiện bảng dữ liệu và nhập dữ liệu
            } else {
                loginMessage.textContent = 'Tên người dùng hoặc mật khẩu không chính xác.';
            }
        } else {
            loginMessage.textContent = 'Không tìm thấy thông tin người dùng.';
        }
    });
});

// Gửi giá trị mới
const sendButton = document.getElementById('send-button');
const khancapToggle = document.getElementById('khancap-toggle');
const inputMessage = document.getElementById('input-message');

sendButton.addEventListener('click', () => {
    const selectedSensor = document.getElementById('sensor-select').value;
    const gasThreshold = document.getElementById('gas-threshold-input').value;
    const tempThreshold = document.getElementById('temp-threshold-input').value;

    if (gasThreshold !== '' && tempThreshold !== '') {
        set(ref(database, `${selectedSensor}/Gas_threshold`), gasThreshold);
        set(ref(database, `${selectedSensor}/Temp_threshold`), tempThreshold);
        inputMessage.textContent = 'Giá trị đã được gửi thành công!';
    } else {
        inputMessage.textContent = 'Vui lòng nhập đầy đủ giá trị!';
    }
});

// Bật hoặc tắt khẩn cấp
khancapToggle.addEventListener('click', () => {
    const selectedSensor = document.getElementById('sensor-select').value;
    const currentKhancap = snRefs[selectedSensor].khancap.textContent;

    if (currentKhancap === 'OFF') {
        set(ref(database, `${selectedSensor}/khancap`), -2); // ON
    } else {
        set(ref(database, `${selectedSensor}/khancap`), -1); // OFF
    }
});
