"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _utils = require("./utils");
var _FontAwesome = _interopRequireDefault(require("react-native-vector-icons/FontAwesome"));
var _reactNativeUiDatepicker = _interopRequireDefault(require("react-native-ui-datepicker"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DatePickerModal = ({
  date,
  setDate,
  datePickerWithTime,
  showDatePicker,
  setShowDatePicker,
  disableFutureDates,
  disablePastDates,
  onDateChange,
  datePickerBackgroundColor,
  hideDatePickerCloseButton,
  datePickerCloseButtonColor,
  datePickerMode,
  selectedItemColor,
  selectedTextStyle,
  firstDayOfWeek,
  headerTextContainerStyle,
  setShowDatePlaceholder,
  animationType
}) => {
  const [isModalVisible, setIsModalVisible] = (0, _react.useState)(false);
  const [modalPosition] = (0, _react.useState)(new _reactNative.Animated.Value(1)); // 1 is off screen, 0 is on screen

  const [selectedDate, setSelectedDate] = (0, _react.useState)(date);

  // console.log("Selected date ==> ", date, typeof date);

  const getScaleAnimation = () => {
    switch (animationType) {
      case 'zoomIn':
        return modalPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        });
      default:
        return 1;
    }
  };
  const getTranslateYAnimation = () => {
    switch (animationType) {
      case 'zoomIn':
        return modalPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [_utils.screenHeight / 5, 0]
        });
      case 'slideUp':
        return modalPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [_utils.screenHeight / 5, _utils.screenHeight]
        });
      case 'slideDown':
        return modalPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [_utils.screenHeight / 5, -_utils.screenHeight / 5]
        });
      default:
        return modalPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [_utils.screenHeight / 5, _utils.screenHeight / 5]
        });
    }
  };
  const getTranslateXAnimation = () => {
    switch (animationType) {
      case 'slideLeft':
        return modalPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, _utils.screenWidth]
        });
      case 'slideRight':
        return modalPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -_utils.screenWidth]
        });
      default:
        return 1;
    }
  };
  const translateYAnimation = getTranslateYAnimation();
  const translateXAnimation = getTranslateXAnimation();
  const scaleAnimation = getScaleAnimation();
  const opacityAnimationOuter = modalPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });
  const handleDateChange = newDate => {
    // console.log("New date ==> ", newDate);

    setSelectedDate(newDate);
    setDate(newDate);
    onDateChange && onDateChange(newDate);
  };
  const leftButtonIcon = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _utils.styles.datePickerModalLeftRightButtonIconOuter
    }, /*#__PURE__*/_react.default.createElement(_FontAwesome.default, {
      name: "angle-left",
      size: 20,
      color: _utils.colors.offWhite
    }));
  };
  const rightButtonIcon = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _utils.styles.datePickerModalLeftRightButtonIconOuter
    }, /*#__PURE__*/_react.default.createElement(_FontAwesome.default, {
      name: "angle-right",
      size: 20,
      color: _utils.colors.offWhite
    }));
  };
  const openModal = () => {
    setIsModalVisible(true);
    _reactNative.Animated.timing(modalPosition, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  };
  const closeModal = () => {
    _reactNative.Animated.timing(modalPosition, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      setIsModalVisible(false);
      setShowDatePicker(false);
    });
  };
  (0, _react.useEffect)(() => {
    if (showDatePicker) {
      openModal();
    }
  }, [showDatePicker]);
  return isModalVisible && /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    visible: isModalVisible,
    transparent: true,
    animationType: "none"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      opacity: opacityAnimationOuter
    } // This is the outer container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: _utils.styles.datePickerModalContainer,
    onPress: () => {
      // console.log("Pressed outside");
      closeModal();
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      flex: 1,
      transform: [{
        translateY: translateYAnimation
      }, {
        translateX: translateXAnimation
      }, {
        scale: scaleAnimation
      }]
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: [_utils.styles.datePickerModalInner, {
      backgroundColor: datePickerBackgroundColor ?? _utils.colors.offWhite
    }],
    onPress: e => {
      e.stopPropagation();
    }
  }, !hideDatePickerCloseButton && /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: [_utils.styles.datePickerModalCloseButton, {
      backgroundColor: datePickerCloseButtonColor ?? _utils.colors.reddishOrange
    }],
    onPress: () => closeModal()
  }, /*#__PURE__*/_react.default.createElement(_FontAwesome.default, {
    name: "times",
    size: 12,
    color: _utils.colors.offWhite
  })), /*#__PURE__*/_react.default.createElement(_reactNativeUiDatepicker.default, {
    mode: "single",
    date: selectedDate,
    timePicker: datePickerWithTime,
    onChange: params => {
      // console.log("Params ==> ", typeof params, params);
      // console.log("Params date ==> ", params.date, typeof (params.date));

      setShowDatePlaceholder && setShowDatePlaceholder(false);
      if (params.date && typeof params.date === 'object') {
        let dateObject;
        if ('toDate' in params.date) {
          // Check if it's a Dayjs object
          dateObject = params.date.toDate(); // Convert to native Date object
        } else {
          dateObject = new Date(params.date);
        }

        // console.log("Date object ==> ", dateObject);

        handleDateChange(dateObject);
      } else if (typeof params.date === 'string' || typeof params.date === 'number') {
        // Convert string or number to Date
        const dateObject = new Date(params.date);
        handleDateChange(dateObject);
      }
    },
    timePickerContainerStyle: _utils.styles.timePickerContainerStyleCustom,
    weekDaysContainerStyle: _utils.styles.weekDaysContainerStyleCustom,
    weekDaysTextStyle: _utils.styles.weekDaysTextStyleCustom,
    yearContainerStyle: _utils.styles.yearContainerStyleCustom,
    monthContainerStyle: _utils.styles.monthContainerStyleCustom,
    timePickerIndicatorStyle: _utils.styles.timePickerIndicatorStyleCustom,
    buttonPrevIcon: leftButtonIcon(),
    buttonNextIcon: rightButtonIcon(),
    headerContainerStyle: _utils.styles.headerContainerStyleCustom,
    headerTextStyle: _utils.styles.headerTextStyleCustom,
    selectedItemColor: selectedItemColor ?? _utils.colors.lightGreen,
    selectedTextStyle: selectedTextStyle ?? _utils.styles.selectedTextStyleCustom,
    firstDayOfWeek: firstDayOfWeek ?? 1,
    maxDate: disableFutureDates ? new Date() : undefined,
    minDate: disablePastDates ? new Date() : undefined,
    headerTextContainerStyle: headerTextContainerStyle ?? _utils.styles.headerTextContainerStyleCustom
  }))))));
};
const FormInput = ({
  mainContainerStyle,
  textContainerStyle,
  placeholderText,
  placeholderTextColor,
  inputStyle,
  inputTextColor,
  hideLabel,
  labelText,
  labelTextStyle,
  labelTextContainerStyle,
  isRequired,
  requiredText,
  requiredTextStyle,
  requiredTextColor,
  labelTextColor,
  textInputProps,
  labelTextProps,
  requiredTextProps,
  mainContainerViewProps,
  textInputContainerViewProps,
  labelTextContainerViewProps,
  characterLimit,
  showCharacterLimit,
  inputType,
  autoCapitalize,
  onTextChange,
  value,
  error,
  errorText,
  errorTextStyle,
  leftIcon,
  leftIconColor,
  leftIconStyle,
  leftIconContainerStyle,
  renderLeftIcon,
  leftIconOnPress,
  rightIcon,
  rightIconColor,
  rightIconStyle,
  rightIconContainerStyle,
  renderRightIcon,
  rightIconOnPress,
  hiddenText,
  disabled,
  // Date Picker Props
  datePicker,
  datePickerWithTime,
  disableFutureDates,
  disablePastDates,
  initialDate,
  onDateChange,
  sendDateValue,
  datePickerBackgroundColor,
  hideDatePickerCloseButton,
  datePickerCloseButtonColor,
  datePickerMode,
  selectedItemColor,
  selectedTextStyle,
  firstDayOfWeek,
  headerTextContainerStyle,
  datePlaceholder,
  datePickerAnimationType
  // Date Picker Props
}) => {
  const [inputValue, setInputValue] = (0, _react.useState)('');
  const [date, setDate] = (0, _react.useState)(initialDate ?? new Date());
  const [showDatePicker, setShowDatePicker] = (0, _react.useState)(false);
  const [showDatePlaceholder, setShowDatePlaceholder] = (0, _react.useState)(false);
  const handleTextChange = text => {
    setInputValue(text);
    onTextChange && onTextChange(text);
  };
  (0, _react.useEffect)(() => {
    if (datePlaceholder) {
      setShowDatePlaceholder(true);
    }
  }, [datePlaceholder]);
  (0, _react.useEffect)(() => {
    if (datePicker && sendDateValue) {
      datePickerWithTime ? sendDateValue(date.toLocaleString().replace(/am|pm/i, match => match.toUpperCase())) : date instanceof Date ? sendDateValue(date.toLocaleDateString()) : sendDateValue(date);
    }
  }, [date]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    style: mainContainerStyle ?? _utils.styles.defaultMainContainerStyle
  }, mainContainerViewProps), datePicker && showDatePicker && /*#__PURE__*/_react.default.createElement(DatePickerModal, {
    date: date,
    setDate: setDate,
    onDateChange: onDateChange,
    datePickerWithTime: datePickerWithTime,
    showDatePicker: showDatePicker,
    setShowDatePicker: setShowDatePicker,
    disableFutureDates: disableFutureDates,
    disablePastDates: disablePastDates,
    datePickerBackgroundColor: datePickerBackgroundColor,
    hideDatePickerCloseButton: hideDatePickerCloseButton,
    datePickerCloseButtonColor: datePickerCloseButtonColor
    // datePickerMode={datePickerMode} Have to do this later
    ,
    selectedItemColor: selectedItemColor,
    selectedTextStyle: selectedTextStyle,
    firstDayOfWeek: firstDayOfWeek,
    headerTextContainerStyle: headerTextContainerStyle,
    setShowDatePlaceholder: setShowDatePlaceholder,
    animationType: datePickerAnimationType ?? 'zoomIn'
  }), !hideLabel && /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    style: labelTextContainerStyle ?? _utils.styles.defaultLabelTextContainerStyle
  }, labelTextContainerViewProps), /*#__PURE__*/_react.default.createElement(_reactNative.Text, _extends({
    style: [labelTextStyle ?? _utils.styles.defaultLabelTextStyle, labelTextColor ? {
      color: labelTextColor
    } : {}]
  }, labelTextProps), labelText ? labelText : 'Input Label'), isRequired && /*#__PURE__*/_react.default.createElement(_reactNative.Text, _extends({
    style: [_utils.styles.defaultRequiredTextStyle, requiredTextStyle ? requiredTextStyle : {}, requiredTextColor ? {
      color: requiredTextColor
    } : {}]
  }, requiredTextProps), requiredText ? requiredText : '*')), /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    style: textContainerStyle ?? [_utils.styles.defaultTextContainerStyle, !characterLimit && {
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10
    }, error && {
      backgroundColor: _utils.colors.lightError
    }]
  }, textInputContainerViewProps), leftIcon && /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: leftIconContainerStyle ?? _utils.styles.defaultLeftIconContainerStyle,
    onPress: datePicker ? () => setShowDatePicker(true) : leftIconOnPress ?? (() => {})
  }, renderLeftIcon ? renderLeftIcon({
    children: leftIcon,
    style: leftIconStyle
  }) : /*#__PURE__*/_react.default.createElement(_FontAwesome.default, {
    name: leftIcon,
    size: 20,
    color: error ? _utils.colors.error : leftIconColor ?? _utils.colors.grey
  })), rightIcon && /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: rightIconContainerStyle ?? _utils.styles.defaultRightIconContainerStyle,
    onPress: rightIconOnPress ?? (() => {})
  }, renderRightIcon ? renderRightIcon({
    children: leftIcon,
    style: rightIconStyle
  }) : /*#__PURE__*/_react.default.createElement(_FontAwesome.default, {
    name: rightIcon,
    size: 20,
    color: error ? _utils.colors.error : rightIconColor ?? _utils.colors.grey
  })), datePicker ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _utils.styles.dateInputWrapperInner
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: [inputStyle ?? _utils.styles.defaultInputStyle, inputStyle ?? {
      justifyContent: 'center',
      height: 50
    }, inputTextColor ? {
      color: inputTextColor
    } : {}, error ? {
      borderColor: _utils.colors.error
    } : {}, leftIcon ? {
      paddingLeft: 40
    } : {}, rightIcon ? {
      paddingRight: 40
    } : {}],
    onPress: () => setShowDatePicker(true)
  }, showDatePlaceholder && datePlaceholder ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, datePlaceholder) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, datePickerWithTime ? date.toLocaleString().replace(/am|pm/i, match => match.toUpperCase()) : date instanceof Date ? date.toLocaleDateString() : date))) : /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, _extends({
    placeholder: placeholderText ?? 'Enter text',
    placeholderTextColor: placeholderTextColor ?? _utils.colors.grey,
    style: [inputStyle ?? _utils.styles.defaultInputStyle, inputTextColor ? {
      color: inputTextColor
    } : {}, error ? {
      borderColor: _utils.colors.error
    } : {}, leftIcon ? {
      paddingLeft: 40
    } : {}, rightIcon ? {
      paddingRight: 40
    } : {}],
    onChangeText: handleTextChange,
    maxLength: characterLimit,
    keyboardType: inputType ?? 'default',
    value: value ?? inputValue,
    autoCapitalize: autoCapitalize ?? 'sentences',
    secureTextEntry: hiddenText,
    editable: !disabled
  }, textInputProps)), characterLimit && showCharacterLimit && /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, characterLimit ? `${value?.length ?? inputValue?.length}/${characterLimit}` : '')), errorText && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: errorTextStyle ?? _utils.styles.defaultErrorTextStyle
  }, '* ', errorText));
};
var _default = exports.default = FormInput;
//# sourceMappingURL=formInput.js.map