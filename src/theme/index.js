import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import { components } from "./components";

export const overrides = {
    colors: {...colors.brand},
    fonts: {
        body: "avertastd-regularuploadedfile"
      },
    components
}

