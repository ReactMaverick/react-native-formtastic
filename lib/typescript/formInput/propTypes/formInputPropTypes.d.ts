import { ReactNode } from "react";
import { StyleProp, TextInputProps, TextProps, TextStyle, ViewProps, ViewStyle } from "react-native";
export type FormInputPropTypes = {
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
    leftIconStyle?: StyleProp<TextStyle>;
    leftIconContainerStyle?: ViewStyle;
    renderLeftIcon?: ReactNode;
    leftIconSource?: 'font-awesome' | 'font-awesome5' | 'material' | 'material-community' | 'simple-line-icon' | 'zocial' | 'octicon' | 'ionicon' | 'foundation' | 'evilicon' | 'entypo' | 'ant-design' | 'feather' | 'fontisto';
    leftIconSize?: number;
    leftIconOnPress?: () => void;
    rightIcon?: string;
    rightIconColor?: string;
    rightIconStyle?: StyleProp<TextStyle>;
    rightIconContainerStyle?: ViewStyle;
    renderRightIcon?: ReactNode;
    rightIconSource?: 'font-awesome' | 'font-awesome5' | 'material' | 'material-community' | 'simple-line-icon' | 'zocial' | 'octicon' | 'ionicon' | 'foundation' | 'evilicon' | 'entypo' | 'ant-design' | 'feather' | 'fontisto';
    rightIconSize?: number;
    rightIconOnPress?: () => void;
    hiddenText?: boolean;
    disabled?: boolean;
    theme?: 'light' | 'dark' | 'system';
    multiline?: boolean;
    numberOfLines?: number;
    datePicker?: boolean;
    datePickerWithTime?: boolean;
    disableFutureDates?: boolean;
    disablePastDates?: boolean;
    initialDate?: Date;
    initialRange?: {
        startDate: Date | undefined;
        endDate: Date | undefined;
    };
    initialDates?: Date[] | undefined;
    onDateChange?: (date: Date) => void;
    sendDateValue?: (dateValue: string) => void;
    onDateRangeChange?: (range: {
        startDate: Date | undefined;
        endDate: Date | undefined;
    }) => void;
    sendDateRangeValues?: (startDateValue: string, endDateValue: string) => void;
    onDatesChange?: (dates: Date[] | undefined) => void;
    sendDatesValues?: (datesValues: string[]) => void;
    datePickerBackgroundColor?: string;
    showDatePickerCloseButton?: boolean;
    datePickerCloseButtonColor?: string;
    datePickerMode?: 'single' | 'range' | 'multiple';
    selectedItemColor?: string;
    firstDayOfWeek?: number;
    headerTextContainerStyle?: ViewStyle;
    datePlaceholder?: string;
    datePickerAnimationType?: 'zoomIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'none';
    animationDuration?: number;
    hideDatePickerConfirmButton?: boolean;
    dateFormat?: string;
    dateTimeFormat?: string;
    selectedContainerStyle?: ViewStyle;
    selectedTextStyle?: TextStyle;
    todayContainerStyle?: ViewStyle;
    todayTextStyle?: TextStyle;
    weekDaysContainerStyle?: ViewStyle;
    weekDaysTextStyle?: TextStyle;
    yearContainerStyle?: ViewStyle;
    yearTextStyle?: TextStyle;
    activeYearContainerStyle?: ViewStyle;
    activeYearTextStyle?: TextStyle;
    selectedYearContainerStyle?: ViewStyle;
    selectedYearTextStyle?: TextStyle;
    monthContainerStyle?: ViewStyle;
    monthTextStyle?: TextStyle;
    selectedMonthContainerStyle?: ViewStyle;
    selectedMonthTextStyle?: TextStyle;
    datePickerLeftButtonStyle?: ViewStyle;
    datePickerRightButtonStyle?: ViewStyle;
    datePickerDayContainerStyle?: ViewStyle;
    datePickerDayTextStyle?: TextStyle;
    yearSelectorTextStyle?: TextStyle;
    monthSelectorTextStyle?: TextStyle;
    timeSelectorTextStyle?: TextStyle;
    datePickerOutsideDayTextStyle?: TextStyle;
    timePickerIndicatorStyle?: ViewStyle;
    datePickerRangeStyle?: ViewStyle;
    datePickerProps?: any;
    datePickerStyles?: any;
    timeTextStyle?: TextStyle;
};
//# sourceMappingURL=formInputPropTypes.d.ts.map