export const appLinkSX = (props) => ({
    bgColor: props.menuListItem.link === props.router.asPath ? "brand.light-blue" : "",
    display: "flex",
    pl: "13.9px",
    pr: "13px",
    py: "8px",
    alignItems: "center",
    borderRadius: "4px",
    cursor: "pointer",
    gap:"20px",
})