import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface IProps extends TouchableOpacityProps {
  label?: string;
  variant?: "primary" | "secondary" | "outlined";
  labelStyle?: StyleProp<TextStyle>;
}

const AppButton: React.FC<IProps> = ({
  label,
  style,
  variant = "primary",
  labelStyle,
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.touchable,
        variant === "primary" && styles.primaryTouchable,
        variant === "secondary" && styles.secondaryTouchable,
        variant === "outlined" && styles.outlinedTouchable,
        style,
      ].filter(Boolean)}
      {...rest}
    >
      {children ? (
        children
      ) : (
        <Text
          style={[
            styles.label,
            variant === "primary" && styles.primaryLabel,
            variant === "secondary" && styles.secondaryLabel,
            variant === "outlined" && styles.outlinedLabel,
          ].filter(Boolean)}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flexShrink: 0,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  primaryTouchable: {
    backgroundColor: "#367C72",
  },
  secondaryTouchable: {
    backgroundColor: "#FF2E29",
  },
  outlinedTouchable: {
    borderWidth: 1,
    borderColor: "#05201C",
  },
  label: {
    color: "#000",
    fontSize: 16,
    lineHeight: 20,
  },
  primaryLabel: {
    color: "#fff",
  },
  secondaryLabel: {
    color: "#fff",
  },
  outlinedLabel: {
    color: "#05201C", //05201C
  },
});

export default AppButton;
