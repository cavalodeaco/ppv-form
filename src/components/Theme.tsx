import { MantineProvider } from "@mantine/core";
import { CustomFonts } from "./CustomFonts";

export default function Theme({ children }: { children: JSX.Element }) {
  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        colors: {
          ppv: [
            "#F5EEE9",
            "#ECD5C8",
            "#E8BCA3",
            "#EDA47B",
            "#FA8C4D",
            "#E57D42",
            "#CF703A",
            "#B1683E",
            "#956042",
            "#7E5843",
          ],
        },
        headings: {
          fontFamily: "TimeBurner, fantasy, Ubuntu, sans-serif",
          fontWeight: "bold",
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <CustomFonts />
      {children}
    </MantineProvider>
  );
}
