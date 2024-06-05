function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useEffect, useState } from 'react';
import { Animated, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { colors, screenHeight, screenWidth, styles } from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-ui-datepicker';
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalPosition] = useState(new Animated.Value(1)); // 1 is off screen, 0 is on screen

  const [selectedDate, setSelectedDate] = useState(date);

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
          outputRange: [screenHeight / 5, 0]
        });
      case 'slideUp':
        return modalPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [screenHeight / 5, screenHeight]
        });
      case 'slideDown':
        return modalPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [screenHeight / 5, -screenHeight / 5]
        });
      default:
        return modalPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [screenHeight / 5, screenHeight / 5]
        });
    }
  };
  const getTranslateXAnimation = () => {
    switch (animationType) {
      case 'slideLeft':
        return modalPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, screenWidth]
        });
      case 'slideRight':
        return modalPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -screenWidth]
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
    return /*#__PURE__*/React.createElement(View, {
      style: styles.datePickerModalLeftRightButtonIconOuter
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "angle-left",
      size: 20,
      color: colors.offWhite
    }));
  };
  const rightButtonIcon = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.datePickerModalLeftRightButtonIconOuter
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "angle-right",
      size: 20,
      color: colors.offWhite
    }));
  };
  const openModal = () => {
    setIsModalVisible(true);
    Animated.timing(modalPosition, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  };
  const closeModal = () => {
    Animated.timing(modalPosition, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      setIsModalVisible(false);
      setShowDatePicker(false);
    });
  };
  useEffect(() => {
    if (showDatePicker) {
      openModal();
    }
  }, [showDatePicker]);
  return isModalVisible && /*#__PURE__*/React.createElement(Modal, {
    visible: isModalVisible,
    transparent: true,
    animationType: "none"
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      opacity: opacityAnimationOuter
    } // This is the outer container
  }, /*#__PURE__*/React.createElement(Pressable, {
    style: styles.datePickerModalContainer,
    onPress: () => {
      // console.log("Pressed outside");
      closeModal();
    }
  }, /*#__PURE__*/React.createElement(Animated.View, {
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
  }, /*#__PURE__*/React.createElement(Pressable, {
    style: [styles.datePickerModalInner, {
      backgroundColor: datePickerBackgroundColor ?? colors.offWhite
    }],
    onPress: e => {
      e.stopPropagation();
    }
  }, !hideDatePickerCloseButton && /*#__PURE__*/React.createElement(Pressable, {
    style: [styles.datePickerModalCloseButton, {
      backgroundColor: datePickerCloseButtonColor ?? colors.reddishOrange
    }],
    onPress: () => closeModal()
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "times",
    size: 12,
    color: colors.offWhite
  })), /*#__PURE__*/React.createElement(DateTimePicker, {
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
    timePickerContainerStyle: styles.timePickerContainerStyleCustom,
    weekDaysContainerStyle: styles.weekDaysContainerStyleCustom,
    weekDaysTextStyle: styles.weekDaysTextStyleCustom,
    yearContainerStyle: styles.yearContainerStyleCustom,
    monthContainerStyle: styles.monthContainerStyleCustom,
    timePickerIndicatorStyle: styles.timePickerIndicatorStyleCustom,
    buttonPrevIcon: leftButtonIcon(),
    buttonNextIcon: rightButtonIcon(),
    headerContainerStyle: styles.headerContainerStyleCustom,
    headerTextStyle: styles.headerTextStyleCustom,
    selectedItemColor: selectedItemColor ?? colors.lightGreen,
    selectedTextStyle: selectedTextStyle ?? styles.selectedTextStyleCustom,
    firstDayOfWeek: firstDayOfWeek ?? 1,
    maxDate: disableFutureDates ? new Date() : undefined,
    minDate: disablePastDates ? new Date() : undefined,
    headerTextContainerStyle: headerTextContainerStyle ?? styles.headerTextContainerStyleCustom
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
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(initialDate ?? new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePlaceholder, setShowDatePlaceholder] = useState(false);
  const handleTextChange = text => {
    setInputValue(text);
    onTextChange && onTextChange(text);
  };
  useEffect(() => {
    if (datePlaceholder) {
      setShowDatePlaceholder(true);
    }
  }, [datePlaceholder]);
  useEffect(() => {
    if (datePicker && sendDateValue) {
      datePickerWithTime ? sendDateValue(date.toLocaleString().replace(/am|pm/i, match => match.toUpperCase())) : date instanceof Date ? sendDateValue(date.toLocaleDateString()) : sendDateValue(date);
    }
  }, [date]);
  return /*#__PURE__*/React.createElement(View, _extends({
    style: mainContainerStyle ?? styles.defaultMainContainerStyle
  }, mainContainerViewProps), datePicker && showDatePicker && /*#__PURE__*/React.createElement(DatePickerModal, {
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
  }), !hideLabel && /*#__PURE__*/React.createElement(View, _extends({
    style: labelTextContainerStyle ?? styles.defaultLabelTextContainerStyle
  }, labelTextContainerViewProps), /*#__PURE__*/React.createElement(Text, _extends({
    style: [labelTextStyle ?? styles.defaultLabelTextStyle, labelTextColor ? {
      color: labelTextColor
    } : {}]
  }, labelTextProps), labelText ? labelText : 'Input Label'), isRequired && /*#__PURE__*/React.createElement(Text, _extends({
    style: [styles.defaultRequiredTextStyle, requiredTextStyle ? requiredTextStyle : {}, requiredTextColor ? {
      color: requiredTextColor
    } : {}]
  }, requiredTextProps), requiredText ? requiredText : '*')), /*#__PURE__*/React.createElement(View, _extends({
    style: textContainerStyle ?? [styles.defaultTextContainerStyle, !characterLimit && {
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10
    }, error && {
      backgroundColor: colors.lightError
    }]
  }, textInputContainerViewProps), leftIcon && /*#__PURE__*/React.createElement(Pressable, {
    style: leftIconContainerStyle ?? styles.defaultLeftIconContainerStyle,
    onPress: datePicker ? () => setShowDatePicker(true) : leftIconOnPress ?? (() => {})
  }, renderLeftIcon ? renderLeftIcon({
    children: leftIcon,
    style: leftIconStyle
  }) : /*#__PURE__*/React.createElement(Icon, {
    name: leftIcon,
    size: 20,
    color: error ? colors.error : leftIconColor ?? colors.grey
  })), rightIcon && /*#__PURE__*/React.createElement(Pressable, {
    style: rightIconContainerStyle ?? styles.defaultRightIconContainerStyle,
    onPress: rightIconOnPress ?? (() => {})
  }, renderRightIcon ? renderRightIcon({
    children: leftIcon,
    style: rightIconStyle
  }) : /*#__PURE__*/React.createElement(Icon, {
    name: rightIcon,
    size: 20,
    color: error ? colors.error : rightIconColor ?? colors.grey
  })), datePicker ? /*#__PURE__*/React.createElement(View, {
    style: styles.dateInputWrapperInner
  }, /*#__PURE__*/React.createElement(Pressable, {
    style: [inputStyle ?? styles.defaultInputStyle, inputStyle ?? {
      justifyContent: 'center',
      height: 50
    }, inputTextColor ? {
      color: inputTextColor
    } : {}, error ? {
      borderColor: colors.error
    } : {}, leftIcon ? {
      paddingLeft: 40
    } : {}, rightIcon ? {
      paddingRight: 40
    } : {}],
    onPress: () => setShowDatePicker(true)
  }, showDatePlaceholder && datePlaceholder ? /*#__PURE__*/React.createElement(Text, null, datePlaceholder) : /*#__PURE__*/React.createElement(Text, null, datePickerWithTime ? date.toLocaleString().replace(/am|pm/i, match => match.toUpperCase()) : date instanceof Date ? date.toLocaleDateString() : date))) : /*#__PURE__*/React.createElement(TextInput, _extends({
    placeholder: placeholderText ?? 'Enter text',
    placeholderTextColor: placeholderTextColor ?? colors.grey,
    style: [inputStyle ?? styles.defaultInputStyle, inputTextColor ? {
      color: inputTextColor
    } : {}, error ? {
      borderColor: colors.error
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
  }, textInputProps)), characterLimit && showCharacterLimit && /*#__PURE__*/React.createElement(Text, null, characterLimit ? `${value?.length ?? inputValue?.length}/${characterLimit}` : '')), errorText && /*#__PURE__*/React.createElement(Text, {
    style: errorTextStyle ?? styles.defaultErrorTextStyle
  }, '* ', errorText));
};
export default FormInput;
//# sourceMappingURL=formInput.js.map