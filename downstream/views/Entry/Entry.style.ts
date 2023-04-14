import { StyleSheet, Platform } from "react-native";
import { Theme } from "../../models/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabs: {
    display: "flex",
    flexDirection: "row",
    columnGap: Theme.spacing.md,
  },
  input: {
    height: 40,
    backgroundColor: Theme.colors.buttonSecondary,
    color: Theme.colors.font,
    borderRadius: Theme.spacing["sm"],
    padding: Theme.spacing["sm"],
    fontSize: Theme.fontSizes["md"],
  },
  form: {
    rowGap: Theme.spacing["lg"],
    width: Platform.OS === "web" ? "30%" : "100%",
  },
  formFieldContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: Theme.spacing.md,
  },
  formField: {
    flex: 1,
    rowGap: Theme.spacing["sm"],
  },
});
