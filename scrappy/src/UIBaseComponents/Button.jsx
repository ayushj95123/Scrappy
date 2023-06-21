import React from "react";
import { Button as MUIButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const TEXT_BUTTON_PADDING_MAPPING = {
  small: "4px 10.5px",
  medium: "6px 12px",
  large: "8px 12px",
};

const BUTTON_PADDING_MAPPING = {
  small: "4px 21px",
  medium: "6px 24px",
  large: "8px 24px",
};

const getPaddingValues = (size, variant) => {
  if (variant === "text") {
    return TEXT_BUTTON_PADDING_MAPPING[size];
  }
  return BUTTON_PADDING_MAPPING[size];
};

const StyledButton = styled(MUIButton)(({ size, variant }) => ({
  padding: getPaddingValues(size, variant),
}));

function Button({ size = "medium", variant = "contained", children, ...rest }) {
  return (
    <StyledButton size={size} variant={variant} {...rest} disableElevation>
      {children}
    </StyledButton>
  );
}

export default Button;
