import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }: any) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
  [`> div.${tooltipClasses.tooltip}.${tooltipClasses.tooltipPlacementBottom}`]:
    {
      marginTop: "0.5em",
    },
}));
