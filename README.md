# FormInput Component

The `FormInput` is a custom, reusable input component for React-Native applications. It supports both text input and date picker functionality. This component utilizes the `TextInput` component from React Native and the `react-native-ui-datepicker` for date picking functionality.

## Usage

```tsx
// If you are using js / jsx instead of ts / tsx, remove the types. (i.e.: <string>, :string, type declaration/s).
import { useState } from "react";
import { FormInput } from "react-native-formtastic";

const App = () => {
  const [name, setName] = useState<string>("");

  type Errors = {
    name?: string;
  };

  const [errors, setErrors] = useState<Errors>({
    name: "",
  });

  return (
    <FormInput
      placeholderText="Enter your name"
      labelText="Name"
      isRequired={true}
      characterLimit={20} // Limits The Number of Characters Users Can Type
      value={name}
      onTextChange={(text: string) => {
        setName(text);
      }}
      error={errors.name !== ""}
      errorText={errors.name}
      leftIcon="user"
      rightIcon="times-circle"
      rightIconColor={name ? colors.grey : colors.lightGrey}
      rightIconOnPress={() => {
        setName("");
      }}
    />
  );
};

export default App;
```

## Reference Image

![Screenshot of FormInput component](https://i.ibb.co/3NPLqjz/text-Input-ref-1.png "FormInput component")

## DatePicker Usage

```tsx
// If you are using js / jsx instead of ts / tsx, remove the types. (i.e.: <string>, :string, type declaration/s).
import { useState } from "react";
import { FormInput } from "react-native-formtastic";

const App = () => {
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [dateOfBirthValue, setDateOfBirthValue] = useState<string>("");

  type Errors = {
    dateOfBirth?: string;
    dateOfBirthValue?: string;
  };

  const [errors, setErrors] = useState<Errors>({
    dateOfBirth: "",
    dateOfBirthValue: "",
  });

  const resetErrors = () => {
    let updatedErrors = {
      dateOfBirth: "",
      dateOfBirthValue: "",
    };
  };

  return (
    <FormInput
      labelText="Date of Birth"
      isRequired={true}
      error={errors.dateOfBirthValue !== ""}
      errorText={errors.dateOfBirthValue}
      leftIcon={"calendar"}
      datePicker={true} // Use This Prop to Enable The DatePicker
      datePickerWithTime={true} // Whether to Include Date With Time
      disableFutureDates={true} // Disable Selection of Future Dates
      datePlaceholder="Select Date of Birth"
      onDateChange={(date: Date) => {
        setDateOfBirth(date);
      }}
      sendDateValue={(dateValue) => {
        setDateOfBirthValue(dateValue);
      }}
    />
  );
};

export default App;
```

## Reference Image (Date Picker)

![Screenshot of FormInput date picker](https://i.ibb.co/FVdj8jH/date-Picker-ref-1.png "FormInput date picker")
![Screenshot of FormInput date picker](https://i.ibb.co/t2JDffG/date-Picker-ref-2.png "FormInput date picker")

## Props

The component accepts the following props:

- `mainContainerStyle`: Style object for the outermost main container.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  mainContainerStyle={{ justifyContent: "center" }}
  //... Other Props
/>
```

- `inputContainerStyle`: Style object for the input container.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  inputContainerStyle={{ justifyContent: "center" }}
  //... Other Props
/>
```

- `placeholderText`: Placeholder text for the input field.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  placeholderText="Enter your name"
  //... Other Props
/>
```

- `placeholderTextColor`: Color of the placeholder text.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  placeholderTextColor="black"
  //... Other Props
/>
```

- `inputStyle`: Style object for the input field.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  inputStyle={{ borderWidth: 0 }}
  //... Other Props
/>
```

- `inputTextColor`: Color of the input text.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  inputTextColor="white"
  //... Other Props
/>
```

- `hideLabel`: Boolean to hide the label.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  hideLabel={true}
  //... Other Props
/>
```

- `labelText`: Text for the label.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  labelText="Name"
  //... Other Props
/>
```

- `labelTextStyle`: Style object for the label text.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  labelTextStyle={{ fontSize: 12 }}
  //... Other Props
/>
```

- `labelTextContainerStyle`: Style object for the label text container.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  labelTextContainerStyle={{ flexDirection: "column" }}
  //... Other Props
/>
```

- `isRequired`: Boolean to mark the input as required.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  isRequired={true}
  //... Other Props
/>
```

- `requiredText`: Text to display instead of '\*' when the input is required.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredText="This field is required!"
  //... Other Props
/>
```

- `requiredTextStyle`: Style object for the required text.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextStyle={{ fontSize: 5 }}
  //... Other Props
/>
```

- `requiredTextColor`: Color of the required text.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `labelTextColor`: Color of the label text.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  labelTextColor="blue"
  //... Other Props
/>
```

- `textInputProps`: Additional props for the TextInput component.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  textInputProps={{ maxLength: 10 }}
  //... Other Props
/>
```

- `labelTextProps`: Additional props for the label text.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  labelTextProps={{ numberOfLines: 1 }}
  //... Other Props
/>
```

- `requiredTextProps`: Additional props for the required text.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextProps={{ ellipsizeMode: "tail" }}
  //... Other Props
/>
```

- `mainContainerViewProps`: Additional props for the main container view.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  mainContainerViewProps={{ accessibilityLabel: "main container" }}
  //... Other Props
/>
```

- `inputContainerViewProps`: Additional props for the text input container view.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  inputContainerViewProps={{ accessibilityLabel: "input container" }}
  //... Other Props
/>
```

- `labelTextContainerViewProps`: Additional props for the label text container view.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  labelTextContainerViewProps={{ accessibilityLabel: "label text container" }}
  //... Other Props
/>
```

- `characterLimit`: Maximum number of characters allowed in the input.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  characterLimit={50}
  //... Other Props
/>
```

- `showCharacterLimit`: Boolean to show the character limit below input field.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  showCharacterLimit={true}
  //... Other Props
/>
```

- `inputType`: Type of input (e.g., 'default', 'numeric', 'email-address').
- - Usage:

```tsx
<FormInput
  //.... Other Props
  inputType="numeric"
  //... Other Props
/>
```

- `autoCapitalize`: How to auto capitalize the input (e.g., 'none', 'sentences', 'words', 'characters').
- - Usage:

```tsx
<FormInput
  //.... Other Props
  autoCapitalize="words"
  //... Other Props
/>
```

- `onTextChange`: Function to call when the text changes.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  onTextChange={(text: string) => console.log(text)}
  //... Other Props
/>
```

- `value`: Value of the input field.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  value="Initial value"
  //... Other Props
/>
```

- `error`: Boolean to indicate an error state.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  error={false}
  //... Other Props
/>
```

- `errorText`: Text to display when there is an error.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  errorText="Invalid input"
  //... Other Props
/>
```

- `errorTextStyle`: Style object for the error text.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  errorTextStyle={{ color: "red" }}
  //... Other Props
/>
```

- `leftIcon`: Name of the left icon (Icon used: react-native-vector-icons/FontAwesome).
- - Usage:

```tsx
<FormInput
  //.... Other Props
  leftIcon="home"
  //... Other Props
/>
```

- `leftIconColor`: Color of the left icon.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  leftIconColor="blue"
  //... Other Props
/>
```

- `leftIconStyle`: Style object for the left icon.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  leftIconStyle={{ size: 20 }}
  //... Other Props
/>
```

- `leftIconContainerStyle`: Style object for the left icon container.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  leftIconContainerStyle={{ padding: 10 }}
  //... Other Props
/>
```

- `renderLeftIcon`: Function to render a custom left icon.
- - Usage:

```tsx
import Icon/Image/AnyComponent from 'npm-package or local directory'

<FormInput
  //.... Other Props
  renderLeftIcon={() => <Icon/Image/AnyComponent name="home" />}
  //... Other Props
/>
```

- `leftIconOnPress`: Function to call when the left icon is pressed.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  leftIconOnPress={() => console.log("Left icon pressed")}
  //... Other Props
/>
```

- `rightIcon`: Name of the right icon (Icon used: react-native-vector-icons/FontAwesome).
- - Usage:

```tsx
<FormInput
  //.... Other Props
  rightIcon="settings"
  //... Other Props
/>
```

- `rightIconColor`: Color of the right icon.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  rightIconColor="green"
  //... Other Props
/>
```

- `rightIconStyle`: Style object for the right icon.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  rightIconStyle={{ size: 20 }}
  //... Other Props
/>
```

- `rightIconContainerStyle`: Style object for the right icon container.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  rightIconContainerStyle={{ padding: 10 }}
  //... Other Props
/>
```

- `renderRightIcon`: Function to render a custom right icon.
- - Usage:

```tsx
import Icon/Image/AnyComponent from 'npm-package or local directory'

<FormInput
  //.... Other Props
  renderRightIcon={() => <Icon/Image/AnyComponent name="home" />}
  //... Other Props
/>
```

- `rightIconOnPress`: Function to call when the right icon is pressed.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  rightIconOnPress={() => console.log("Right icon pressed")}
  //... Other Props
/>
```

- `hiddenText`: Boolean to hide the text input (for password fields).
- - Usage:

```tsx
<FormInput
  //.... Other Props
  hiddenText={true}
  //... Other Props
/>
```

- `disabled`: Boolean to disable the input field.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  disabled={false}
  //... Other Props
/>
```

## Date Picker Props

These are the date picker props

- `datePicker`: Boolean to enable the date picker functionality.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  datePicker={true}
  //... Other Props
/>
```

- `datePickerWithTime`: Boolean to include time in the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  datePickerWithTime={true}
  //... Other Props
/>
```

- `disableFutureDates`: Boolean to disable future dates in the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  disableFutureDates={true}
  //... Other Props
/>
```

- `disablePastDates`: Boolean to disable past dates in the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  disablePastDates={true}
  //... Other Props
/>
```

- `initialDate`: Initial date for the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  initialDate={new Date()}
  //... Other Props
/>
```

- `initialRange`: Initial date range for the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  initialRange={startDate: new Date(), endDate: new Date()}
  //... Other Props
/>
```

- `initialDates`: Initial dates for the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `onDateChange`: Function to call when the date changes.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `sendDateValue`: Function to call with the selected date value.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `onDateRangeChange`: Function to call when the date range changes.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `sendDateRangeValues`: Function to call with the selected date range values.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `onDatesChange`: Function to call when the dates change.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `sendDatesValues`: Function to call with the selected dates values.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `datePickerBackgroundColor`: Background color for the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `showDatePickerCloseButton`: Boolean to show the close button in the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `datePickerCloseButtonColor`: Color of the close button in the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `datePickerMode`: Mode of the date picker (e.g., 'date', 'time', 'datetime').
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `selectedItemColor`: Color of the selected item in the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `selectedTextStyle`: Style object for the selected text in the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `firstDayOfWeek`: First day of the week in the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `headerTextContainerStyle`: Style object for the header text container in the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `datePlaceholder`: Placeholder text for the date picker.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `datePickerAnimationType`: Animation type for the date picker (e.g., 'zoomIn', 'slideUp', 'slideDown', slideLeft', 'slideRight').
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `animationDuration`: Custom animation duration for the transition of date picker modal.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `hideDatePickerConfirmButton`: Boolean to hide the date picker confirm button.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `dateFormat`: Custom format for the date / date range / dates.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```

- `dateTimeFormat`: Custom format for the date and time for single date if datePickerWithTime is selected.
- - Usage:

```tsx
<FormInput
  //.... Other Props
  requiredTextColor="red"
  //... Other Props
/>
```
