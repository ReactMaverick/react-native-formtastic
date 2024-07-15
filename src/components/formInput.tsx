import React, { FunctionComponent, ReactNode, useCallback, useEffect, useState } from 'react';
import { Animated, Modal, Pressable, StyleProp, Text, TextInput, TextInputProps, TextProps, TextStyle, useColorScheme, View, ViewProps, ViewStyle } from 'react-native';
import { colors, getThemedColor, screenHeight, screenWidth, styles } from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

type DatePickerModalProps = {
    date?: Date | undefined;
    setDate?: (date: Date) => void;
    range: {
        startDate: Date | undefined;
        endDate: Date | undefined;
    };
    setRange: (range: { startDate: Date | undefined; endDate: Date | undefined; }) => void;
    dates: Date[] | undefined;
    setDates: (dates: Date[] | undefined) => void;
    datePickerWithTime?: boolean;
    showDatePicker?: boolean;
    setShowDatePicker: (showDatePicker: boolean) => void;
    disableFutureDates?: boolean;
    disablePastDates?: boolean;
    onDateChange?: (date: Date) => void;
    onDateRangeChange?: (range: { startDate: Date | undefined; endDate: Date | undefined; }) => void;
    onDatesChange?: (dates: Date[] | undefined) => void;
    datePickerBackgroundColor?: string;
    showDatePickerCloseButton?: boolean;
    datePickerCloseButtonColor?: string;
    datePickerMode?: 'single' | 'range' | 'multiple';
    selectedItemColor?: string;
    selectedTextStyle?: TextStyle;
    firstDayOfWeek?: number;
    headerTextContainerStyle?: ViewStyle;
    setShowDatePlaceholder?: (showDatePlaceholder: boolean) => void;
    animationType?: 'zoomIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'none';
    animationDuration?: number;
    hideConfirmButton?: boolean;
    theme?: 'light' | 'dark' | 'system';
};

const DatePickerModal: React.FC<DatePickerModalProps> = ({
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

    // console.log("Selected date ==> ", date, typeof date);

    // console.log("Selected range ==> ", selectedRange);

    // console.log("Selected dates ==> ", selectedDates);


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
            // console.log("Params ==> ", params);

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
            duration: animationDuration, // Custom Animation Duration or 400
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(modalPosition, {
            toValue: 1,
            duration: animationDuration, // Custom Animation Duration or 400
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
                }}  // This is the outer container
                >
                    <Pressable
                        style={styles.datePickerModalContainer}
                        onPress={() => {
                            // console.log("Pressed outside");
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
                                    displayFullDays={true} // Display Previous and Next Month Days in the Calendar
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

type FormInputProps = {
    mainContainerStyle?: ViewStyle;
    inputContainerStyle?: ViewStyle;
    inputContainerBackgroundColor?: string;
    placeholderText?: string;
    placeholderTextColor?: string;
    inputStyle?: TextStyle | ViewStyle;
    inputTextColor?: string;
    hideLabel?: boolean;
    labelText?: string;
    labelTextStyle?: TextStyle;
    labelTextContainerStyle?: ViewStyle;
    isRequired?: boolean;
    requiredText?: string;
    requiredTextStyle?: TextStyle;
    requiredTextColor?: string;
    labelTextColor?: string;
    textInputProps?: TextInputProps;
    labelTextProps?: TextProps;
    requiredTextProps?: TextProps;
    mainContainerViewProps?: ViewProps;
    inputContainerViewProps?: ViewProps;
    labelTextContainerViewProps?: ViewProps;
    characterLimit?: number;
    showCharacterLimit?: boolean;
    inputType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'name-phone-pad' | 'twitter' | 'web-search' | undefined;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
    onTextChange?: (text: string) => void;
    value?: string;
    error?: boolean;
    errorText?: string;
    errorTextStyle?: TextStyle;
    leftIcon?: string;
    leftIconColor?: string;
    leftIconStyle?: object;
    leftIconContainerStyle?: ViewStyle;
    renderLeftIcon?: FunctionComponent<{ children?: ReactNode, style?: ViewStyle }>;
    leftIconOnPress?: () => void;
    rightIcon?: string;
    rightIconColor?: string;
    rightIconStyle?: object;
    rightIconContainerStyle?: ViewStyle;
    renderRightIcon?: FunctionComponent<{ children?: ReactNode, style?: ViewStyle }>;
    rightIconOnPress?: () => void;
    hiddenText?: boolean;
    disabled?: boolean;
    theme?: 'light' | 'dark' | 'system';
    // Date Picker Props
    datePicker?: boolean;
    datePickerWithTime?: boolean;
    disableFutureDates?: boolean;
    disablePastDates?: boolean;
    initialDate?: Date;
    initialRange?: { startDate: Date | undefined; endDate: Date | undefined; };
    initialDates?: Date[] | undefined;
    onDateChange?: (date: Date) => void;
    sendDateValue?: (dateValue: string) => void;
    onDateRangeChange?: (range: { startDate: Date | undefined; endDate: Date | undefined; }) => void;
    sendDateRangeValues?: (startDateValue: string, endDateValue: string) => void;
    onDatesChange?: (dates: Date[] | undefined) => void;
    sendDatesValues?: (datesValues: string[]) => void;
    datePickerBackgroundColor?: string;
    showDatePickerCloseButton?: boolean;
    datePickerCloseButtonColor?: string;
    datePickerMode?: 'single' | 'range' | 'multiple';
    selectedItemColor?: string;
    selectedTextStyle?: TextStyle;
    firstDayOfWeek?: number;
    headerTextContainerStyle?: ViewStyle;
    datePlaceholder?: string;
    datePickerAnimationType?: 'zoomIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'none';
    animationDuration?: number;
    hideDatePickerConfirmButton?: boolean;
    dateFormat?: string;
    dateTimeFormat?: string;
    // Date Picker Props
};

const FormInput: React.FC<FormInputProps> = ({
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

    // const [showAllDates, setShowAllDates] = useState(false);

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
            // console.log("Date ==> ", date, typeof date);

            // console.log("Date in FormInput ==> ", dayjs(date).format('YYYY-MM-DD '));

            datePickerWithTime ? sendDateValue(dayjs(date).format(dateTimeFormat ?? 'DD-MM-YYYY hh:mm:ss A')) : sendDateValue(dayjs(date).format(dateFormat ?? 'DD-MM-YYYY'));
        }
    }, [date]);

    useEffect(() => {
        if (datePicker && sendDateRangeValues && range.startDate && range.endDate) {
            // console.log("Range ==> ", range);

            sendDateRangeValues(dayjs(range.startDate).format(dateFormat ?? 'DD-MM-YYYY'), dayjs(range.endDate).format(dateFormat ?? 'DD-MM-YYYY'));
        }
    }, [range]);

    useEffect(() => {
        if (datePicker && sendDatesValues && dates) {
            // console.log("Dates ==> ", dates);

            sendDatesValues(dates.map(date => dayjs(date).format(dateFormat ?? 'DD-MM-YYYY')));
        }
    }, [dates]);

    // console.log('Range ==> ', range);

    // console.log('Dates ==> ', dates);

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