# FormInput Component

The `FormInput` is a custom, reusable input component for React applications. It supports both text input and date picker functionality.

## Props

The component accepts the following props:

- `mainContainerStyle`: Style object for the main container.
- `textContainerStyle`: Style object for the text container.
- `placeholderText`: Placeholder text for the input field.
- `placeholderTextColor`: Color of the placeholder text.
- `inputStyle`: Style object for the input field.
- `inputTextColor`: Color of the input text.
- `hideLabel`: Boolean to hide the label.
- `labelText`: Text for the label.
- `labelTextStyle`: Style object for the label text.
- `labelTextContainerStyle`: Style object for the label text container.
- `isRequired`: Boolean to mark the input as required.
- `requiredText`: Text to display when the input is required.
- `requiredTextStyle`: Style object for the required text.
- `requiredTextColor`: Color of the required text.
- `labelTextColor`: Color of the label text.
- `textInputProps`: Additional props for the TextInput component.
- `labelTextProps`: Additional props for the label text.
- `requiredTextProps`: Additional props for the required text.
- `mainContainerViewProps`: Additional props for the main container view.
- `textInputContainerViewProps`: Additional props for the text input container view.
- `labelTextContainerViewProps`: Additional props for the label text container view.
- `characterLimit`: Maximum number of characters allowed in the input.
- `showCharacterLimit`: Boolean to show the character limit.
- `inputType`: Type of input (e.g., 'default', 'numeric', 'email-address').
- `autoCapitalize`: How to auto capitalize the input (e.g., 'none', 'sentences', 'words', 'characters').
- `onTextChange`: Function to call when the text changes.
- `value`: Value of the input field.
- `error`: Boolean to indicate an error state.
- `errorText`: Text to display when there is an error.
- `errorTextStyle`: Style object for the error text.
- `leftIcon`: Name of the left icon.
- `leftIconColor`: Color of the left icon.
- `leftIconStyle`: Style object for the left icon.
- `leftIconContainerStyle`: Style object for the left icon container.
- `renderLeftIcon`: Function to render a custom left icon.
- `leftIconOnPress`: Function to call when the left icon is pressed.
- `rightIcon`: Name of the right icon.
- `rightIconColor`: Color of the right icon.
- `rightIconStyle`: Style object for the right icon.
- `rightIconContainerStyle`: Style object for the right icon container.
- `renderRightIcon`: Function to render a custom right icon.
- `rightIconOnPress`: Function to call when the right icon is pressed.
- `hiddenText`: Boolean to hide the text input (for password fields).
- `disabled`: Boolean to disable the input field.
- `datePicker`: Boolean to enable the date picker functionality.
- `datePickerWithTime`: Boolean to include time in the date picker.
- `disableFutureDates`: Boolean to disable future dates in the date picker.
- `disablePastDates`: Boolean to disable past dates in the date picker.
- `initialDate`: Initial date for the date picker.
- `onDateChange`: Function to call when the date changes.
- `sendDateValue`: Function to call with the selected date value.
- `datePickerBackgroundColor`: Background color for the date picker.
- `hideDatePickerCloseButton`: Boolean to hide the close button in the date picker.
- `datePickerCloseButtonColor`: Color of the close button in the date picker.
- `datePickerMode`: Mode of the date picker (e.g., 'date', 'time', 'datetime').
- `selectedItemColor`: Color of the selected item in the date picker.
- `selectedTextStyle`: Style object for the selected text in the date picker.
- `firstDayOfWeek`: First day of the week in the date picker.
- `headerTextContainerStyle`: Style object for the header text container in the date picker.
- `datePlaceholder`: Placeholder text for the date picker.
- `datePickerAnimationType`: Animation type for the date picker (e.g., 'slide', 'fade').

## Usage

```tsx
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
