import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import { components } from "./components";
import { breakpoints } from "./breakpoint";

export const overrides = {
    colors: {...colors.brand},
    
    fonts: {
        body: 'AvertaRegular',  // Averta with fallback
        heading: 'AvertaRegular',
      },
    components,
    breakpoints
}

