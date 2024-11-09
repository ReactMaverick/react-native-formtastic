import React, { useCallback, useEffect, useState } from 'react';
import { Animated, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { colors, getThemedColor, screenHeight, screenWidth, styles } from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { DatePickerModalPropTypes } from './propTypes/datePickerModalPropTypes';
import { FormInputPropTypes } from './propTypes/formInputPropTypes';

const DatePickerModal: React.FC<DatePickerModalPropTypes> = ({
    date,
    setDate,
    range,
    setRange,
    dates,
    setDates,
    datePickerWithTime,
    showDatePicker,
    setShowDatePicker,
    disableFutureDates,
    disablePastDates,
    onDateChange,
    onDateRangeChange,
    onDatesChange,
    datePickerBackgroundColor,
    showDatePickerCloseButton = false,
    datePickerCloseButtonColor,
    datePickerMode = 'single',
    selectedItemColor,
    selectedTextStyle,
    firstDayOfWeek,
    headerTextContainerStyle,
    setShowDatePlaceholder,
    animationType,
    animationDuration,
    hideConfirmButton,
    theme = 'system',
}) => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const [modalPosition] = useState(new Animated.Value(1)); // 1 is off screen, 0 is on screen

    const [selectedDate, setSelectedDate] = useState(date);

    const [selectedRange, setSelectedRange] = useState(range);

    const [selectedDates, setSelectedDates] = useState(dates);

    const getScaleAnimation = () => {
        switch (animationType) {
            case 'zoomIn':
                return modalPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
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
                    outputRange: [screenHeight / 5, 0],
                })
            case 'slideUp':
                return modalPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screenHeight / 5, screenHeight],
                });
            case 'slideDown':
                return modalPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screenHeight / 5, -screenHeight / 5],
                });

            default:
                return modalPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screenHeight / 5, screenHeight / 5],
                });
        }
    };

    const getTranslateXAnimation = () => {
        switch (animationType) {
            case 'slideLeft':
                return modalPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, screenWidth],
                });
            case 'slideRight':
                return modalPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -screenWidth],
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
        outputRange: [1, 0],
    });

    const onChangeDate = useCallback(
        (params: any) => {

            setShowDatePlaceholder && setShowDatePlaceholder(false);

            if (!params) return;

            if (datePickerMode === 'single' && setDate) {
                setSelectedDate(params.date);
                setDate && setDate(params.date);
                onDateChange && onDateChange(params.date);
            } else if (datePickerMode === 'range' && setRange) {
                setSelectedRange(params);
                setRange && setRange(params);
                onDateRangeChange && onDateRangeChange(params);
            } else if (datePickerMode === 'multiple' && setDates) {
                setSelectedDates(params.dates);
                setDates(params.dates);
                onDatesChange && onDatesChange(params.dates);
            }
        },
        [datePickerMode]
    );

    const leftButtonIcon = () => {
        return (
            <View style={styles.datePickerModalLeftRightButtonIconOuter}>
                <Icon name='angle-left' size={20} color={colors.offWhite} />
            </View>
        );
    }

    const rightButtonIcon = () => {
        return (
            <View style={styles.datePickerModalLeftRightButtonIconOuter}>
                <Icon name='angle-right' size={20} color={colors.offWhite} />
            </View>
        );
    }

    const openModal = () => {
        setIsModalVisible(true);
        Animated.timing(modalPosition, {
            toValue: 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(modalPosition, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
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

    return (
        isModalVisible && (
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType='none'
            >
                <Animated.View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    opacity: opacityAnimationOuter,
                }}
                >
                    <Pressable
                        style={styles.datePickerModalContainer}
                        onPress={() => {
                            closeModal();
                        }}
                    >
                        <Animated.View
                            style={
                                {
                                    flex: 1,
                                    transform: [
                                        {
                                            translateY: translateYAnimation,
                                        },
                                        {
                                            translateX: translateXAnimation,
                                        },
                                        {
                                            scale: scaleAnimation,
                                        },
                                    ],
                                }
                            }
                        >
                            <Pressable style={[styles.datePickerModalInner,
                            getThemedColor(theme, 'datePickerModalInner'),
                            datePickerBackgroundColor ? { backgroundColor: datePickerBackgroundColor } : {}
                            ]}
                                onPress={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                {showDatePickerCloseButton &&
                                    <Pressable
                                        style={[styles.datePickerModalCloseButton,
                                        datePickerCloseButtonColor ? { backgroundColor: datePickerCloseButtonColor } : {}
                                        ]}
                                        onPress={() => closeModal()}
                                    >
                                        <Icon name='times' size={12} color={colors.offWhite} />
                                    </Pressable>
                                }
                                <DateTimePicker
                                    mode={datePickerMode ?? 'single'}
                                    date={selectedDate}
                                    startDate={selectedRange.startDate}
                                    endDate={selectedRange.endDate}
                                    dates={selectedDates}
                                    timePicker={datePickerWithTime}
                                    displayFullDays={true}
                                    onChange={onChangeDate}
                                    timePickerContainerStyle={styles.timePickerContainerStyleCustom}
                                    weekDaysContainerStyle={styles.weekDaysContainerStyleCustom}
                                    weekDaysTextStyle={styles.weekDaysTextStyleCustom}
                                    yearContainerStyle={styles.yearContainerStyleCustom}
                                    monthContainerStyle={styles.monthContainerStyleCustom}
                                    timePickerIndicatorStyle={styles.timePickerIndicatorStyleCustom}
                                    buttonPrevIcon={leftButtonIcon()}
                                    buttonNextIcon={rightButtonIcon()}
                                    headerContainerStyle={styles.headerContainerStyleCustom}
                                    headerTextStyle={styles.headerTextStyleCustom}
                                    selectedItemColor={selectedItemColor ?? colors.lightGreen}
                                    selectedTextStyle={selectedTextStyle ?? styles.selectedTextStyleCustom}
                                    firstDayOfWeek={firstDayOfWeek ?? 1}
                                    maxDate={disableFutureDates ? new Date() : undefined}
                                    minDate={disablePastDates ? new Date() : undefined}
                                    headerTextContainerStyle={headerTextContainerStyle ?? styles.headerTextContainerStyleCustom}
                                />

                                {!hideConfirmButton &&
                                    <Pressable
                                        style={styles.datePickerConfirmButton}
                                        onPress={() => closeModal()}
                                    >
                                        <Text style={styles.datePickerConfirmButtonText}>Confirm</Text>
                                    </Pressable>
                                }


                            </Pressable>
                        </Animated.View>
                    </Pressable>
                </Animated.View>
            </Modal>
        )
    );
}

const FormInput: React.FC<FormInputPropTypes> = ({
    mainContainerStyle,
    inputContainerStyle,
    inputContainerBackgroundColor,
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
    inputContainerViewProps,
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
    theme = 'system',
    // Date Picker Props
    datePicker,
    datePickerWithTime,
    disableFutureDates,
    disablePastDates,
    initialDate,
    initialRange,
    initialDates,
    onDateChange,
    sendDateValue,
    onDateRangeChange,
    sendDateRangeValues,
    onDatesChange,
    sendDatesValues,
    datePickerBackgroundColor,
    showDatePickerCloseButton,
    datePickerCloseButtonColor,
    datePickerMode,
    selectedItemColor,
    selectedTextStyle,
    firstDayOfWeek,
    headerTextContainerStyle,
    datePlaceholder,
    datePickerAnimationType,
    animationDuration,
    hideDatePickerConfirmButton,
    dateFormat,
    dateTimeFormat,
    // Date Picker Props
}) => {

    const [inputValue, setInputValue] = useState<string>('');

    // For Single Date //
    const [date, setDate] = useState<Date | undefined>(initialDate ?? undefined);

    // For Date Range //
    const [range, setRange] = useState<{
        startDate: Date | undefined;
        endDate: Date | undefined;
    }>({ startDate: initialRange?.startDate ?? undefined, endDate: initialRange?.endDate ?? undefined });

    // For Multiple Dates //
    const [dates, setDates] = useState<Date[] | undefined>(initialDates ?? undefined);

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const [showDatePlaceholder, setShowDatePlaceholder] = useState<boolean>(false);

    const handleTextChange = (text: string) => {
        setInputValue(text);
        onTextChange && onTextChange(text);
    }

    useEffect(() => {
        if (datePlaceholder) {
            setShowDatePlaceholder(true);
        }
    }, [datePlaceholder]);

    useEffect(() => {
        if (datePicker && sendDateValue && date) {

            datePickerWithTime ? sendDateValue(dayjs(date).format(dateTimeFormat ?? 'DD-MM-YYYY hh:mm:ss A')) : sendDateValue(dayjs(date).format(dateFormat ?? 'DD-MM-YYYY'));
        }
    }, [date]);

    useEffect(() => {
        if (datePicker && sendDateRangeValues && range.startDate && range.endDate) {

            sendDateRangeValues(dayjs(range.startDate).format(dateFormat ?? 'DD-MM-YYYY'), dayjs(range.endDate).format(dateFormat ?? 'DD-MM-YYYY'));
        }
    }, [range]);

    useEffect(() => {
        if (datePicker && sendDatesValues && dates) {

            sendDatesValues(dates.map(date => dayjs(date).format(dateFormat ?? 'DD-MM-YYYY')));
        }
    }, [dates]);

    return (
        <View
            style={
                mainContainerStyle ?? styles.defaultMainContainerStyle
            }
            {...mainContainerViewProps}
        >
            {datePicker && showDatePicker &&
                <DatePickerModal
                    date={date}
                    setDate={setDate}
                    range={range}
                    setRange={setRange}
                    dates={dates}
                    setDates={setDates}
                    onDateChange={onDateChange}
                    onDateRangeChange={onDateRangeChange}
                    onDatesChange={onDatesChange}
                    datePickerWithTime={datePickerWithTime}
                    showDatePicker={showDatePicker}
                    setShowDatePicker={setShowDatePicker}
                    disableFutureDates={disableFutureDates}
                    disablePastDates={disablePastDates}
                    datePickerBackgroundColor={datePickerBackgroundColor}
                    showDatePickerCloseButton={showDatePickerCloseButton}
                    datePickerCloseButtonColor={datePickerCloseButtonColor}
                    datePickerMode={datePickerMode}
                    selectedItemColor={selectedItemColor}
                    selectedTextStyle={selectedTextStyle}
                    firstDayOfWeek={firstDayOfWeek}
                    headerTextContainerStyle={headerTextContainerStyle}
                    setShowDatePlaceholder={setShowDatePlaceholder}
                    animationType={datePickerAnimationType ?? 'zoomIn'}
                    animationDuration={animationDuration ?? 400}
                    hideConfirmButton={hideDatePickerConfirmButton}
                    theme={theme}
                />
            }
            {!hideLabel &&
                <View
                    style={
                        labelTextContainerStyle ?? styles.defaultLabelTextContainerStyle
                    }
                    {...labelTextContainerViewProps}
                >
                    <Text
                        style={
                            [
                                labelTextStyle ?? styles.defaultLabelTextStyle,
                                getThemedColor(theme, 'labelTextStyle'),
                                labelTextColor ? { color: labelTextColor } : {}
                            ]
                        }
                        {...labelTextProps}
                    >
                        {labelText ? labelText : 'Input Label'}
                    </Text>
                    {isRequired &&
                        <Text
                            style={
                                [
                                    styles.defaultRequiredTextStyle,
                                    requiredTextStyle ? requiredTextStyle : {},
                                    requiredTextColor ? { color: requiredTextColor } : {}
                                ]
                            }
                            {...requiredTextProps}
                        >
                            {requiredText ? requiredText : '*'}
                        </Text>}
                </View>
            }
            <View
                style={
                    inputContainerStyle ?? [styles.defaultInputContainerStyle,
                    getThemedColor(theme, 'inputContainerStyle'),
                    !showCharacterLimit && { borderBottomStartRadius: 10, borderBottomEndRadius: 10 },
                    inputContainerBackgroundColor ? { backgroundColor: inputContainerBackgroundColor } : {},
                    error && { backgroundColor: colors.lightError }
                    ]
                }
                {...inputContainerViewProps}
            >
                {leftIcon &&
                    <Pressable
                        style={leftIconContainerStyle ?? styles.defaultLeftIconContainerStyle}
                        onPress={
                            datePicker && !disabled ?
                                () => setShowDatePicker(true) :
                                datePicker && disabled ? (() => { }) :
                                    leftIconOnPress ?? (() => { })
                        }
                    >
                        {
                            renderLeftIcon ?
                                renderLeftIcon({ children: leftIcon, style: leftIconStyle }) :
                                <Icon name={leftIcon} size={20} color={error ? colors.error : leftIconColor ?? colors.slightlyDarkGrey} />
                        }
                    </Pressable>
                }

                {rightIcon &&
                    <Pressable
                        style={rightIconContainerStyle ?? styles.defaultRightIconContainerStyle}
                        onPress={rightIconOnPress ?? (() => { })}
                    >
                        {
                            renderRightIcon ?
                                renderRightIcon({ children: leftIcon, style: rightIconStyle }) :
                                <Icon name={rightIcon} size={20} color={error ? colors.error : rightIconColor ?? colors.slightlyDarkGrey} />
                        }
                    </Pressable>
                }
                {datePicker ?
                    <View style={styles.dateInputWrapperInner}>
                        <Pressable
                            style={
                                [inputStyle ?? styles.defaultInputStyle,
                                getThemedColor(theme, 'inputStyle'),
                                error ? { borderColor: colors.error } : {},
                                leftIcon ? { paddingLeft: 40 } : {},
                                rightIcon ? { paddingRight: 40 } : {}
                                ]
                            }
                            onPress={() => {
                                if (disabled) return;
                                setShowDatePicker(true);
                            }}
                        >
                            {showDatePlaceholder && datePlaceholder ?
                                <Text
                                    style={[
                                        inputTextColor ? { color: inputTextColor } : {
                                            color: colors.slightlyDarkGrey
                                        },
                                        disabled ? { color: colors.lightGrey } : {}
                                    ]}
                                >{datePlaceholder}</Text> :
                                date ?
                                    (<Text
                                        style={[
                                            inputTextColor ? { color: inputTextColor } : {
                                                color: colors.darkGrey
                                            },
                                            disabled ? { color: colors.lightGrey } : {}
                                        ]}
                                    >{datePickerWithTime ? dayjs(date).format(dateTimeFormat ?? 'DD-MM-YYYY hh:mm:ss A') : dayjs(date).format(dateFormat ?? 'DD-MM-YYYY')}</Text>) :
                                    range && range.startDate && range.endDate ?
                                        (<Text
                                            style={[
                                                inputTextColor ? { color: inputTextColor } : {
                                                    color: colors.darkGrey
                                                },
                                                disabled ? { color: colors.lightGrey } : {}
                                            ]}
                                        >{`${dayjs(range.startDate).format(dateFormat ?? 'DD-MM-YYYY')} - ${dayjs(range.endDate).format(dateFormat ?? 'DD-MM-YYYY')}`}</Text>) :
                                        dates && dates.length ?
                                            (
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        flexWrap: 'wrap',
                                                        justifyContent: 'flex-start',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {dates.slice(0, 3).map((date, index) => (
                                                        <Text
                                                            key={index}
                                                            style={[
                                                                inputTextColor ? { color: inputTextColor } : {
                                                                    color: colors.darkGrey
                                                                },
                                                                disabled ? { color: colors.lightGrey } : {}
                                                            ]}
                                                        >
                                                            {`${dayjs(date).format(dateFormat ?? 'DD-MM-YYYY')}${index < dates.length - 1 && index < 2 ? ', ' : index === 2 ? '...' : ''}`}
                                                        </Text>
                                                    ))}
                                                </View>
                                            ) : null
                            }
                        </Pressable>
                    </View>

                    :
                    <TextInput
                        placeholder={
                            placeholderText ?? 'Enter text'
                        }
                        placeholderTextColor={
                            placeholderTextColor ?? colors.grey
                        }
                        style={
                            [inputStyle ?? styles.defaultInputStyle,
                            getThemedColor(theme, 'inputStyle'),
                            inputTextColor ? { color: inputTextColor } : {},
                            error ? { borderColor: colors.error } : {},
                            leftIcon ? { paddingLeft: 40 } : {},
                            rightIcon ? { paddingRight: 40 } : {}
                            ]
                        }
                        onChangeText={handleTextChange}
                        maxLength={characterLimit}
                        keyboardType={inputType ?? 'default'}
                        value={value ?? inputValue}
                        autoCapitalize={autoCapitalize ?? 'sentences'}
                        secureTextEntry={hiddenText}
                        editable={!disabled}
                        {...textInputProps}
                    />
                }


                {characterLimit && showCharacterLimit &&
                    <Text>{characterLimit ? `${value?.length ?? inputValue?.length}/${characterLimit}` : ''}</Text>
                }
            </View>

            {errorText &&
                <Text style={errorTextStyle ?? styles.defaultErrorTextStyle}>{'* '}{errorText}</Text>
            }
        </View>
    );
};

export default FormInput;