const Text = {
  // Styles for the base style
  baseStyle: {
    color: "brand.primary-text",
    fontStyle: "normal",
    fontFamily:'sans-serif'
  },
  // Styles for the size variations
  sizes: {
    "card-header": {
      fontSize: ["14px", "14px", "14px", "16px", "18px", "18px"],
    },
    "stat-header": {
      fontSize: ["14px", "14px", "14px", "14px", "16px", "16px"],
    },
    "page-header": {
      fontSize: ["18px", "18px", "18px", "20px", "18px", "23px"],
    },
    "dropdown-text": {
      fontSize: ["12px", "12px", "12px", "14px", "14px", "14px"],
    },
    "tag-text": {
      fontSize: "12px",
    },
    "tiny-text": {
      fontSize: "8px",
    },
    "extra-large-text": {
      fontSize: "34px",
    },
  },
  // Styles for the visual style variations
  variants: {
    "card-header": {
      fontWeight: 800,
      fontFamily:'sans-serif'
    },
    "page-header": {
      color: "brand.page-header",
      size: "page-header",
      fontWeight: 700,
    },
    "stat-header": {
      color: "brand.stat_header",
      size: "stat-header",
      fontWeight: 600,
    },
    "small-muted-text": {
      fontSize: "11px",
      fontWeight: 400,
      color: "#353F50",
    },
    "drop-down-text-header": {
      fontWeight: 700,
    },
    "chart-header": {
      color: "brand.stat_header",
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "24px",
    },
  },
  // The default `size` or `variant` values
  defaultProps: {},
};

export default Text;
