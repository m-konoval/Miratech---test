import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

interface IProps extends TextInputProps {
  isError?: boolean;
  errorMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const InputField: React.FC<IProps> = ({
  isError,
  errorMessage,
  style,
  containerStyle,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, isError ? styles.inputInvalid : {}, style]}
        {...rest}
      />

      {isError && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    flexShrink: 0,
    paddingTop: 20,
  },
  input: {
    flexGrow: 1,
    flexShrink: 0,
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    fontSize: 14,
  },
  inputInvalid: {
    color: "#FF2E29",
    borderColor: "#FF2E29",
  },
  errorMessage: {
    position: "absolute",
    left: 0,
    top: 0,
    color: "#FF2E29",
    fontSize: 12,
    lineHeight: 20,
  },
});

export default InputField;
