// Function to update sensor data in Firebase
const updateSensorData = (sensorRef, tempThreshold, gasThreshold, khancap) => {
    const updates = {};
    updates[`${sensorRef}/Temp_threshold`] = tempThreshold;
    updates[`${sensorRef}/Gas_threshold`] = gasThreshold;
    updates[`${sensorRef}/khancap`] = khancap;

    return firebase.database().ref().update(updates);
};

// Save button event listeners for SN1
document.getElementById('sn1-save-button').addEventListener('click', () => {
    const tempThreshold = document.getElementById('sn1-temp-threshold').value;
    const gasThreshold = document.getElementById('sn1-gas-threshold').value;
    const khancap = document.getElementById('sn1-khancap').value;

    updateSensorData('SN1', tempThreshold, gasThreshold, khancap)
        .then(() => {
            alert('Cập nhật thành công cho SN1');
        })
        .catch((error) => {
            console.error("Lỗi khi cập nhật SN1:", error);
            alert('Cập nhật thất bại!');
        });
});

// Save button event listeners for SN2
document.getElementById('sn2-save-button').addEventListener('click', () => {
    const tempThreshold = document.getElementById('sn2-temp-threshold').value;
    const gasThreshold = document.getElementById('sn2-gas-threshold').value;
    const khancap = document.getElementById('sn2-khancap').value;

    updateSensorData('SN2', tempThreshold, gasThreshold, khancap)
        .then(() => {
            alert('Cập nhật thành công cho SN2');
        })
        .catch((error) => {
            console.error("Lỗi khi cập nhật SN2:", error);
            alert('Cập nhật thất bại!');
        });
});

// Bạn có thể thêm sự kiện tương tự cho SN3 và SN4
