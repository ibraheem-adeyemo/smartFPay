import React from 'react';
import { Button } from '@chakra-ui/react';

export const ButtonComponent = ({
  size = 'md',               // Default button size
  colorScheme = 'blue',      // Default color scheme
  variant = 'solid',         // Default variant
  isLoading = false,         // Loading state
  isDisabled = false,        // Disabled state
  onClick,                   // Click handler
  children,                  // Button text or elements inside the button
  leftIcon = null,           // Optional left icon
  rightIcon = null,           // Optional right icon
  btnText = 'Button component', 
  width = '300px',       
  ...props                   // Additional props
}) => {
  return (
    <Button
      size={size}
      width={width}
      ml='20px'
      py='30px'
      colorScheme={colorScheme}
      variant={variant}
      isLoading={isLoading}
      isDisabled={isDisabled}
      onClick={onClick}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      {...props}  // Spreads additional props
    >
      {btnText}
    </Button>
  );
};

