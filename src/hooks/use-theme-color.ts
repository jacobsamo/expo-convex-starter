/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "@/hooks/use-color-scheme";
import { THEME } from "@/lib/theme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof THEME.light & keyof typeof THEME.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return THEME[theme][colorName];
  }
}
