import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { Animated, Modal, Pressable, StyleProp, Text, TextInput, TextInputProps, TextProps, View, ViewProps, ViewStyle } from 'react-native';
import { colors, screenHeight, screenWidth, styles } from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-ui-datepicker';

type DatePickerModalProps = {
    date: Date;
    setDate: (date: Date) => void;
    datePickerWithTime?: boolean;
    showDatePicker?: boolean;
    setShowDatePicker: (showDatePicker: boolean) => void;
    disableFutureDates?: boolean;
    disablePastDates?: boolean;
    onDateChange?: (date: Date) => void;
    datePickerBackgroundColor?: string;
    hideDatePickerCloseButton?: boolean;
    datePickerCloseButtonColor?: string;
    datePickerMode?: 'single' | 'range' | 'multiple';
    selectedItemColor?: string;
    selectedTextStyle?: object;
    firstDayOfWeek?: number;
    headerTextContainerStyle?: object;
    setShowDatePlaceholder?: (showDatePlaceholder: boolean) => void;
    animationType?: 'zoomIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'none';
};

const DatePickerModal: React.FC<DatePickerModalProps> = ({
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
    animationType,
}) => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const [modalPosition] = useState(new Animated.Value(1)); // 1 is off screen, 0 is on screen

    const [selectedDate, setSelectedDate] = useState(date);

    // console.log("Selected date ==> ", date, typeof date);

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

    const handleDateChange = (newDate: Date) => {

        // console.log("New date ==> ", newDate);

        setSelectedDate(newDate);
        setDate(newDate);
        onDateChange && onDateChange(newDate);
    }

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
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(modalPosition, {
            toValue: 1,
            duration: 500,
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
                            { backgroundColor: datePickerBackgroundColor ?? colors.offWhite }
                            ]}
                                onPress={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                {!hideDatePickerCloseButton &&
                                    <Pressable
                                        style={[styles.datePickerModalCloseButton,
                                        { backgroundColor: datePickerCloseButtonColor ?? colors.reddishOrange }
                                        ]}
                                        onPress={() => closeModal()}
                                    >
                                        <Icon name='times' size={12} color={colors.offWhite} />
                                    </Pressable>
                                }
                                <DateTimePicker
                                    mode='single'
                                    date={selectedDate}
                                    timePicker={datePickerWithTime}
                                    onChange={(params) => {
                                        // console.log("Params ==> ", typeof params, params);
                                        // console.log("Params date ==> ", params.date, typeof (params.date));

                                        setShowDatePlaceholder && setShowDatePlaceholder(false);

                                        if (params.date && typeof params.date === 'object') {
                                            let dateObject;

                                            if ('toDate' in params.date) { // Check if it's a Dayjs object
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
                                    }}
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

                            </Pressable>
                        </Animated.View>
                    </Pressable>
                </Animated.View>
            </Modal>
        )
    );
}

type FormInputProps = {
    mainContainerStyle?: StyleProp<ViewStyle>;
    textContainerStyle?: object;
    placeholderText?: string;
    placeholderTextColor?: string;
    inputStyle?: object;
    inputTextColor?: string;
    hideLabel?: boolean;
    labelText?: string;
    labelTextStyle?: object;
    labelTextContainerStyle?: object;
    isRequired?: boolean;
    requiredText?: string;
    requiredTextStyle?: object;
    requiredTextColor?: string;
    labelTextColor?: string;
    textInputProps?: TextInputProps;
    labelTextProps?: TextProps;
    requiredTextProps?: TextProps;
    mainContainerViewProps?: ViewProps;
    textInputContainerViewProps?: ViewProps;
    labelTextContainerViewProps?: ViewProps;
    characterLimit?: number;
    showCharacterLimit?: boolean;
    inputType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'name-phone-pad' | 'twitter' | 'web-search' | undefined;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
    onTextChange?: (text: string) => void;
    value?: string;
    error?: boolean;
    errorText?: string;
    errorTextStyle?: object;
    leftIcon?: string;
    leftIconColor?: string;
    leftIconStyle?: object;
    leftIconContainerStyle?: object;
    renderLeftIcon?: FunctionComponent<{ children?: ReactNode, style?: StyleProp<ViewStyle> }>;
    leftIconOnPress?: () => void;
    rightIcon?: string;
    rightIconColor?: string;
    rightIconStyle?: object;
    rightIconContainerStyle?: object;
    renderRightIcon?: FunctionComponent<{ children?: ReactNode, style?: StyleProp<ViewStyle> }>;
    rightIconOnPress?: () => void;
    hiddenText?: boolean;
    disabled?: boolean;
    // Date Picker Props
    datePicker?: boolean;
    datePickerWithTime?: boolean;
    disableFutureDates?: boolean;
    disablePastDates?: boolean;
    initialDate?: Date;
    onDateChange?: (date: Date) => void;
    sendDateValue?: (dateValue: string) => void;
    datePickerBackgroundColor?: string;
    hideDatePickerCloseButton?: boolean;
    datePickerCloseButtonColor?: string;
    datePickerMode?: 'single' | 'range' | 'multiple';
    selectedItemColor?: string;
    selectedTextStyle?: object;
    firstDayOfWeek?: number;
    headerTextContainerStyle?: object;
    datePlaceholder?: string;
    datePickerAnimationType?: 'zoomIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'none';
    // Date Picker Props
};

const FormInput: React.FC<FormInputProps> = ({
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
    datePickerAnimationType,
    // Date Picker Props
}) => {

    const [inputValue, setInputValue] = useState<string>('');

    const [date, setDate] = useState<Date>(initialDate ?? new Date());

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
        if (datePicker && sendDateValue) {
            datePickerWithTime ? sendDateValue(date.toLocaleString().replace(/am|pm/i, match => match.toUpperCase())) : (date instanceof Date ? sendDateValue(date.toLocaleDateString()) : sendDateValue(date))
        }
    }, [date]);

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
                    onDateChange={onDateChange}
                    datePickerWithTime={datePickerWithTime}
                    showDatePicker={showDatePicker}
                    setShowDatePicker={setShowDatePicker}
                    disableFutureDates={disableFutureDates}
                    disablePastDates={disablePastDates}
                    datePickerBackgroundColor={datePickerBackgroundColor}
                    hideDatePickerCloseButton={hideDatePickerCloseButton}
                    datePickerCloseButtonColor={datePickerCloseButtonColor}
                    // datePickerMode={datePickerMode} Have to do this later
                    selectedItemColor={selectedItemColor}
                    selectedTextStyle={selectedTextStyle}
                    firstDayOfWeek={firstDayOfWeek}
                    headerTextContainerStyle={headerTextContainerStyle}
                    setShowDatePlaceholder={setShowDatePlaceholder}
                    animationType={datePickerAnimationType ?? 'zoomIn'}
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
                    textContainerStyle ?? [styles.defaultTextContainerStyle,
                    !characterLimit && { borderBottomStartRadius: 10, borderBottomEndRadius: 10 },
                    error && { backgroundColor: colors.lightError }
                    ]
                }
                {...textInputContainerViewProps}
            >
                {leftIcon &&
                    <Pressable
                        style={leftIconContainerStyle ?? styles.defaultLeftIconContainerStyle}
                        onPress={
                            datePicker ?
                                () => setShowDatePicker(true) :
                                leftIconOnPress ?? (() => { })
                        }
                    >
                        {
                            renderLeftIcon ?
                                renderLeftIcon({ children: leftIcon, style: leftIconStyle }) :
                                <Icon name={leftIcon} size={20} color={error ? colors.error : leftIconColor ?? colors.grey} />
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
                                <Icon name={rightIcon} size={20} color={error ? colors.error : rightIconColor ?? colors.grey} />
                        }
                    </Pressable>
                }
                {datePicker ?
                    <View style={styles.dateInputWrapperInner}>
                        <Pressable
                            style={
                                [inputStyle ?? styles.defaultInputStyle,
                                inputStyle ??
                                {
                                    justifyContent: 'center',
                                    height: 50
                                },
                                inputTextColor ? { color: inputTextColor } : {},
                                error ? { borderColor: colors.error } : {},
                                leftIcon ? { paddingLeft: 40 } : {},
                                rightIcon ? { paddingRight: 40 } : {}
                                ]
                            }
                            onPress={() => setShowDatePicker(true)}
                        >
                            {showDatePlaceholder && datePlaceholder ?
                                <Text>{datePlaceholder}</Text> :
                                <Text>{(datePickerWithTime ? date.toLocaleString().replace(/am|pm/i, match => match.toUpperCase()) : (date instanceof Date ? date.toLocaleDateString() : date))}</Text>
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