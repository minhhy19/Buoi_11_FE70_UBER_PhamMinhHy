function Validator(formSelector) {
	var _this = this;

	function getParent(element, selector) {
		while (element.parentElement) {
			if (element.parentElement.matches(selector)) {
				return element.parentElement;
			}
			element = element.parentElement;
		}
	}

	// Xóa Validate khi đã ấn nút submit
	function handleClearErrorSubmit(frm) {
		var frmGroups = frm.querySelectorAll('.validate-input');
		for (var frmGroup of frmGroups) {
			if (frmGroup.classList.contains('invalid')) {
				frmGroup.classList.remove('invalid');

				var formMessage = frmGroup.querySelector('.form-message');
				if (formMessage) {
					formMessage.innerText = '';
				}
			}
		}
	}

	var formRules = {};

	/**
	 * Quy ước tạo rule:
	 * - Nếu có lỗi thì return `error message`
	 * - Nếu không có lỗi thì return `undefined`
	 */

	var validatorRules = {
		required: function (value) {
			return value ? undefined : 'Vui lòng nhập trường này';
		},
		email: function (value) {
			var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(value) ? undefined : 'Trường này phải là email';
		},
		username: function (value) {
			var regex = /^[a-zA-Z0-9_]*$/;
			return regex.test(value) ? undefined : 'Vui lòng nhập username';
		},
		password: function (value) {
			var regex = /^[a-zA-Z0-9]{3,30}$/;
			return regex.test(value) ? undefined : 'Vui lòng nhập password';
		},
		min: function (min) {
			return function (value) {
				return value.length >= min
					? undefined
					: `Vui lòng nhập ít nhất ${min} kí tự`;
			};
		},
		max: function (max) {
			return function (value) {
				return value.length <= max
					? undefined
					: `Vui lòng nhập tối đa ${max} kí tự`;
			};
		},
		httpsandrtsp: function (value) {
			var pattern = new RegExp(
				'^(https?:\\/\\/)|(rtsp)?' + // protocol
					'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
					'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
					'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
					'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
					'(\\#[-a-z\\d_]*)?$',
				'i'
			); // fragment locator
			return !!pattern.test(value) || value === ''
				? undefined
				: 'Vui lòng nhập nguồn url http(s) hoặc rtsp';
		},
		servermanager: function (value) {
			var regex =
				/^[a-z]+\:+\/+\/+[0-9]+\.+[0-9]+\.+[0-9]+\.+[0-9]+\:+[0-9]+$/;
			return regex.test(value) || value === ''
				? undefined
				: 'Vui lòng nhập server quản lý vd: https://127.0.0.1:5500';
		},
		location: function (value) {
			var regex = /^[0-9]+\.?[0-9]+\,+[0-9]+\.?[0-9]+$/;
			return regex.test(value) || value === ''
				? undefined
				: 'Vui lòng nhập vị trí node vd: 10.123,108.568';
		}
	};
	// Lấy ra form element trong DOM theo `formSelector`
	var formElement = document.querySelector(formSelector);

	// Chỉ xử lý khi có element trong DOM
	if (formElement) {
		var inputs = formElement.querySelectorAll('[name][rules]');
		for (var input of inputs) {
			var rules = input.getAttribute('rules').split('|');
			for (var rule of rules) {
				var ruleInfo;
				var isRuleHasValue = rule.includes(':');

				if (isRuleHasValue) {
					ruleInfo = rule.split(':');
					rule = ruleInfo[0];
				}

				var ruleFunc = validatorRules[rule];

				if (isRuleHasValue) {
					ruleFunc = ruleFunc(ruleInfo[1]);
				}

				if (Array.isArray(formRules[input.name])) {
					formRules[input.name].push(ruleFunc);
				} else {
					formRules[input.name] = [ruleFunc];
				}
			}
			// Lắng nghe sự kiện để validate (blur, change,...)
			input.onblur = handleValidate;
			input.oninput = handleClearError;
		}

		// Hàm thực hiện validate
		function handleValidate(event) {
			var rules = formRules[event.target.name];
			var errorMessage;

			for (var rule of rules) {
				errorMessage = rule(event.target.value);
				if (errorMessage) break;
			}

			// Nếu có lỗi thì hiển thị message lỗi ra UI
			if (errorMessage) {
				var formGroup = getParent(event.target, '.validate-input');

				if (formGroup) {
					formGroup.classList.add('invalid');
					var formMessage = formGroup.querySelector('.form-message');
					if (formMessage) {
						formMessage.innerText = errorMessage;
					}
				}
			}
			return !errorMessage;
		}

		// Hàm clear message lỗi
		function handleClearError(event) {
			var formGroup = getParent(event.target, '.validate-input');
			if (formGroup.classList.contains('invalid')) {
				formGroup.classList.remove('invalid');

				var formMessage = formGroup.querySelector('.form-message');
				if (formMessage) {
					formMessage.innerText = '';
				}
			}
		}
	}

	// Xử lý hành vi submit form
	formElement.onsubmit = function (event) {
		event.preventDefault();

		var inputs = formElement.querySelectorAll('[name][rules]');
		var isValid = true;

		for (var input of inputs) {
			if (!handleValidate({ target: input })) {
				isValid = false;
			}
		}

		// Khi không có lỗi thì submit form
		if (isValid) {
			if (typeof _this.onSubmit === 'function') {
				var enableInputs = formElement.querySelectorAll('[name]');
				var formValues = Array.from(enableInputs).reduce(function (
					values,
					input
				) {
					switch (input.type) {
						case 'radio':
							values[input.name] = formElement.querySelector(
								'input[name="' + input.name + '"]:checked'
							).value;
							break;
						case 'checkbox':
							if (!input.matches(':checked')) {
								values[input.name] = '';
								return values;
							}
							if (!Array.isArray(values[input.name])) {
								values[input.name] = [];
							}
							values[input.name].push(input.value);
							break;
						case 'file':
							values[input.name] = input.files;
							break;
						default:
							values[input.name] = input.value;
					}

					return values;
				},
				{});

				// Xóa Validate khi đã ấn nút submit
				handleClearErrorSubmit(formElement);

				//Gọi lại onSubmit và trả về kèm giá trị của form
				_this.onSubmit(formValues);
			} else {
				formElement.submit();
			}
		}
	};
}
