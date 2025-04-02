import { TextStyle, ViewStyle } from "react-native";
import { DateType } from "react-native-ui-datepicker";

export type DatePickerModalPropTypes = {
    date?: DateType;
    setDate?: (date: DateType) => void;
    range: {
        startDate: DateType;
        endDate: DateType;
    };
    setRange: (range: { startDate: DateType; endDate: DateType; }) => void;
    dates: DateType[] | undefined;
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
    firstDayOfWeek?: number;
    headerContainerStyle?: ViewStyle; // DELETE
    setShowDatePlaceholder?: (showDatePlaceholder: boolean) => void;
    animationType?: 'zoomIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'none';
    animationDuration?: number;
    hideConfirmButton?: boolean;
    theme?: 'light' | 'dark' | 'system';
    selectedContainerStyle?: ViewStyle; // NEW
    selectedTextStyle?: TextStyle; // NEW
    todayContainerStyle?: ViewStyle; // NEW
    todayTextStyle?: TextStyle; // NEW
    weekDaysContainerStyle?: ViewStyle; // NEW
    weekDaysTextStyle?: TextStyle; // NEW
    yearContainerStyle?: ViewStyle; // NEW
    yearTextStyle?: TextStyle; // NEW
    activeYearContainerStyle?: ViewStyle; // NEW
    activeYearTextStyle?: TextStyle; // NEW
    selectedYearContainerStyle?: ViewStyle; // NEW
    selectedYearTextStyle?: TextStyle; // NEW
    monthContainerStyle?: ViewStyle; // NEW
    monthTextStyle?: TextStyle; // NEW
    selectedMonthContainerStyle?: ViewStyle; // NEW
    selectedMonthTextStyle?: TextStyle; // NEW
    datePickerLeftButtonStyle?: ViewStyle; // NEW
    datePickerRightButtonStyle?: ViewStyle; // NEW
    datePickerDayContainerStyle?: ViewStyle; // NEW
    datePickerDayTextStyle?: TextStyle; // NEW
    yearSelectorTextStyle?: TextStyle; // NEW
    monthSelectorTextStyle?: TextStyle; // NEW
    timeSelectorTextStyle?: TextStyle; // NEW
    datePickerOutsideDayTextStyle?: TextStyle; // NEW
    timePickerIndicatorStyle?: ViewStyle; // NEW
    datePickerRangeStyle?: ViewStyle; // NEW
    datePickerProps?: any; // NEW
    datePickerStyles?: any; // NEW
    timeTextStyle?: TextStyle; // NEW
};