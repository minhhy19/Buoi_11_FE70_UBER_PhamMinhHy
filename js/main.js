let isValid = false;
let formUber = new Validator('#form-uber');

formUber.onSubmit = function (formData) {
	if (formData) {
		isValid = true;
		console.log(formData);
	}
};

function xuLyTinhTien(loaiUber, soKM, thoiGianCho) {
	let cuocPhi = {
		kmDauTien: {
			soKM: 0,
			thanhTien: 0
		},
		km1Den20: {
			soKM: 0,
			thanhTien: 0
		},
		km21: {
			soKM: 0,
			thanhTien: 0
		},
		thoiGianCho: {
			soPhut: 0,
			thanhTien: 0
		},
		tongTien: 0
	};

	if (soKM === '' || isNaN(soKM)) {
		soKM = 0;
	}
	if (thoiGianCho === '' || isNaN(thoiGianCho)) {
		thoiGianCho = 0;
	}

	if (soKM <= 1) {
		cuocPhi.kmDauTien.soKM = soKM;
		cuocPhi.thoiGianCho.soPhut = thoiGianCho;

		cuocPhi.kmDauTien.thanhTien = soKM * LOAI_UBER[loaiUber].KM_DAU_TIEN;
		cuocPhi.thoiGianCho.thanhTien =
			thoiGianCho * LOAI_UBER[loaiUber].THOI_GIAN_CHO;
	} else if (soKM > 1 && soKM <= 20) {
		cuocPhi.kmDauTien.soKM = 1;
		cuocPhi.km1Den20.soKM = soKM - 1;
		cuocPhi.thoiGianCho.soPhut = thoiGianCho;

		cuocPhi.kmDauTien.thanhTien = 1 * LOAI_UBER[loaiUber].KM_DAU_TIEN;
		cuocPhi.km1Den20.thanhTien =
			(soKM - 1) * LOAI_UBER[loaiUber].KM_1_DEN_20;
		cuocPhi.thoiGianCho.thanhTien =
			thoiGianCho * LOAI_UBER[loaiUber].THOI_GIAN_CHO;
	} else if (soKM > 20) {
		cuocPhi.kmDauTien.soKM = 1;
		cuocPhi.km1Den20.soKM = 19;
		cuocPhi.km21.soKM = soKM - 20;
		cuocPhi.thoiGianCho.soPhut = thoiGianCho;

		cuocPhi.kmDauTien.thanhTien = 1 * LOAI_UBER[loaiUber].KM_DAU_TIEN;
		cuocPhi.km1Den20.thanhTien = 19 * LOAI_UBER[loaiUber].KM_1_DEN_20;
		cuocPhi.km21.thanhTien = (soKM - 20) * LOAI_UBER[loaiUber].KM_21;
		cuocPhi.thoiGianCho.thanhTien =
			thoiGianCho * LOAI_UBER[loaiUber].THOI_GIAN_CHO;
	}

	cuocPhi.tongTien =
		cuocPhi.kmDauTien.thanhTien +
		cuocPhi.km1Den20.thanhTien +
		cuocPhi.km21.thanhTien +
		cuocPhi.thoiGianCho.thanhTien;
	return cuocPhi;
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

	xuatTien.innerHTML = cuocPhi.tongTien.toLocaleString();
	divThanhTien.style.display = 'block';
}

function popup() {
	let soKM = parseFloat(document.getElementById('soKM').value);
	let thoiGianCho = parseFloat(document.getElementById('thoiGianCho').value);

	let loaiUber = document.querySelector(
		'input[name="loaiUber"]:checked'
	).value;

	let d = new Date();
	let dd = ('0' + d.getDate()).slice(-2);
	let mm = ('0' + (d.getMonth() + 1)).slice(-2);
	let yyyy = d.getFullYear();
	let isToday = `${dd}/${mm}/${yyyy}`;

	// Thông tin hóa đơn
	document.getElementById('billDate').innerText = isToday;
	document.getElementById('billLoaiUber').innerText =
		LOAI_UBER[loaiUber].NAME;

	// ĐƠN GIÁ CỦA TỪNG LOẠI UBER
	document.getElementById('donGiaKm1').innerText =
		LOAI_UBER[loaiUber].KM_DAU_TIEN.toLocaleString();
	document.getElementById('donGiaKm1Den20').innerText =
		LOAI_UBER[loaiUber].KM_1_DEN_20.toLocaleString();
	document.getElementById('donGiaKm21').innerText =
		LOAI_UBER[loaiUber].KM_21.toLocaleString();
	document.getElementById('donGiaTG').innerText =
		LOAI_UBER[loaiUber].THOI_GIAN_CHO.toLocaleString();

	const cuocPhi = xuLyTinhTien(loaiUber, soKM, thoiGianCho);

	// Số Km và số phút
	document.getElementById('soLuongKm1').innerText = cuocPhi.kmDauTien.soKM;
	document.getElementById('soLuongKm1Den20').innerText =
		cuocPhi.km1Den20.soKM;
	document.getElementById('soLuongKm21').innerText = cuocPhi.km21.soKM;
	document.getElementById('soPhutCho').innerText = cuocPhi.thoiGianCho.soPhut;

	// Thành tiền của từng khoản thu
	document.getElementById('thanhTienKm1').innerText =
		cuocPhi.kmDauTien.thanhTien.toLocaleString();
	document.getElementById('thanhTienKm1Den20').innerText =
		cuocPhi.km1Den20.thanhTien.toLocaleString();
	document.getElementById('thanhTienKm21').innerText =
		cuocPhi.km21.thanhTien.toLocaleString();
	document.getElementById('thanhTienTG').innerText =
		cuocPhi.thoiGianCho.thanhTien.toLocaleString();

	document.getElementById('tongTien').innerText =
		cuocPhi.tongTien.toLocaleString();

	$('#billModal').modal();
}

document.getElementById('btnTinhTien').onclick = tinhTien;
document.getElementById('btnPopup').onclick = popup;
