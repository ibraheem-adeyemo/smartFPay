import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import { components } from "./components";

export const overrides = {
    colors: {...colors.brand},
    
    fonts: {
        body: 'Averta, Arial, sans-serif', // Averta with fallback
        heading: 'Averta, Arial, sans-serif',
      },
    components
}

