function xuLyTinhTien(loaiUber, soKM, thoiGianCho) {
	let cuocPhi = {
		kmDauTien: 0,
		km1Den20: 0,
		km21: 0,
		thanhTien: 0,
		thoiGianCho: 0
	};
	// let thanhTien = 0;
	if (soKM === '' || isNaN(soKM)) {
		soKM = 0;
	}
	if (thoiGianCho === '' || isNaN(thoiGianCho)) {
		thoiGianCho = 0;
	}
	// switch (loaiUber) {
	// 	case UBER_X.NAME: {
	// 		if (soKM <= 1) {
	// 			cuocPhi.kmDauTien = soKM * UBER_X.KM_DAU_TIEN;
	// 			cuocPhi.thoiGianCho = thoiGianCho * UBER_X.THOI_GIAN_CHO;
	// 		} else if (soKM > 1 && soKM <= 20) {
	// 			cuocPhi.kmDauTien = 1 * UBER_X.KM_DAU_TIEN;
	// 			cuocPhi.km1Den20 = (soKM - 1) * UBER_X.KM_1_DEN_20;
	// 			cuocPhi.thoiGianCho = thoiGianCho * UBER_X.THOI_GIAN_CHO;
	// 		} else if (soKM > 20) {
	// 			cuocPhi.kmDauTien = 1 * UBER_X.KM_DAU_TIEN;
	// 			cuocPhi.km1Den20 = 19 * UBER_X.KM_1_DEN_20;
	// 			cuocPhi.km1Den20 = (soKM - 20) * UBER_X.KM_21;
	// 			cuocPhi.thoiGianCho = thoiGianCho * UBER_X.THOI_GIAN_CHO;
	// 		}
	// 		break;
	// 	}
	// 	case UBER_SUV.NAME: {
	// 		if (soKM <= 1) {
	// 			cuocPhi.kmDauTien = soKM * UBER_SUV.KM_DAU_TIEN;
	// 			cuocPhi.thoiGianCho = thoiGianCho * UBER_SUV.THOI_GIAN_CHO;
	// 		} else if (soKM > 1 && soKM <= 20) {
	// 			cuocPhi.kmDauTien = 1 * UBER_SUV.KM_DAU_TIEN;
	// 			cuocPhi.km1Den20 = (soKM - 1) * UBER_SUV.KM_1_DEN_20;
	// 			cuocPhi.thoiGianCho = thoiGianCho * UBER_SUV.THOI_GIAN_CHO;
	// 		} else if (soKM > 20) {
	// 			cuocPhi.kmDauTien = 1 * UBER_SUV.KM_DAU_TIEN;
	// 			cuocPhi.km1Den20 = 19 * UBER_SUV.KM_1_DEN_20;
	// 			cuocPhi.km1Den20 = (soKM - 20) * UBER_SUV.KM_21;
	// 			cuocPhi.thoiGianCho = thoiGianCho * UBER_SUV.THOI_GIAN_CHO;
	// 		}
	// 		break;
	// 	}
	// 	case UBER_BLACK.NAME: {
	// 		if (soKM <= 1) {
	// 			cuocPhi.kmDauTien = soKM * UBER_BLACK.KM_DAU_TIEN;
	// 			cuocPhi.thoiGianCho = thoiGianCho * UBER_BLACK.THOI_GIAN_CHO;
	// 		} else if (soKM > 1 && soKM <= 20) {
	// 			cuocPhi.kmDauTien = 1 * UBER_BLACK.KM_DAU_TIEN;
	// 			cuocPhi.km1Den20 = (soKM - 1) * UBER_BLACK.KM_1_DEN_20;
	// 			cuocPhi.thoiGianCho = thoiGianCho * UBER_BLACK.THOI_GIAN_CHO;
	// 		} else if (soKM > 20) {
	// 			cuocPhi.kmDauTien = 1 * UBER_BLACK.KM_DAU_TIEN;
	// 			cuocPhi.km1Den20 = 19 * UBER_BLACK.KM_1_DEN_20;
	// 			cuocPhi.km1Den20 = (soKM - 20) * UBER_BLACK.KM_21;
	// 			cuocPhi.thoiGianCho = thoiGianCho * UBER_BLACK.THOI_GIAN_CHO;
	// 		}
	// 		break;
	// 	}
	// 	default: {
	// 		break;
	// 	}
	// }
	if (soKM <= 1) {
		cuocPhi.kmDauTien = soKM * LOAI_UBER[loaiUber].KM_DAU_TIEN;
		cuocPhi.thoiGianCho = thoiGianCho * LOAI_UBER[loaiUber].THOI_GIAN_CHO;
	} else if (soKM > 1 && soKM <= 20) {
		cuocPhi.kmDauTien = 1 * LOAI_UBER[loaiUber].KM_DAU_TIEN;
		cuocPhi.km1Den20 = (soKM - 1) * LOAI_UBER[loaiUber].KM_1_DEN_20;
		cuocPhi.thoiGianCho = thoiGianCho * LOAI_UBER[loaiUber].THOI_GIAN_CHO;
	} else if (soKM > 20) {
		cuocPhi.kmDauTien = 1 * LOAI_UBER[loaiUber].KM_DAU_TIEN;
		cuocPhi.km1Den20 = 19 * LOAI_UBER[loaiUber].KM_1_DEN_20;
		cuocPhi.km1Den20 = (soKM - 20) * LOAI_UBER[loaiUber].KM_21;
		cuocPhi.thoiGianCho = thoiGianCho * LOAI_UBER[loaiUber].THOI_GIAN_CHO;
	}

	cuocPhi.thanhTien =
		cuocPhi.kmDauTien +
		cuocPhi.km1Den20 +
		cuocPhi.km21 +
		cuocPhi.thoiGianCho;
	return cuocPhi;
	// .toLocaleString()
}

function tinhTien() {
	let soKM = parseFloat(document.getElementById('soKM').value);
	let thoiGianCho = parseFloat(document.getElementById('thoiGianCho').value);
	let divThanhTien = document.getElementById('divThanhTien');
	let xuatTien = document.getElementById('xuatTien');

	let loaiUber = document.querySelector(
		'input[name="loaiUber"]:checked'
	).value;

	const cuocPhi = xuLyTinhTien(loaiUber, soKM, thoiGianCho);

	xuatTien.innerHTML = cuocPhi.thanhTien.toLocaleString();
	divThanhTien.style.display = 'block';
}

document.getElementById('btnTinhTien').onclick = tinhTien;
