import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Link from "next/link";

const LinksList = [
  { id: "top", name: "current" },
  { id: "minutely", name: "minutely" },
  { id: "forty-eight-hours", name: "48hours" },
  { id: "daily", name: "daily" },
  { id: "charts", name: "charts" },
  { id: "map", name: "map" },
  { id: "alerts", name: "alerts" },
];

type NavContentProps = { isAlerts: boolean; close?: () => void };

const NavContent = (props: NavContentProps) => {
  const { isAlerts, close } = props;

  const handleScrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.querySelector(`#${id}`);
    if (element) {
      window.scrollTo({
        behavior: "smooth",
        top:
          element.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          40,
      });
      // element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        gap: {
          xs: "2rem",
          md: "1rem",
        },
        mt: {
          xs: "3rem",
          md: 0,
        },
      }}
    >
      <List
        dense
        disablePadding
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: {
            xs: "1.25rem",
            md: 0,
          },
          pl: {
            xs: "2rem",
            md: 0,
          },
        }}
      >
        {LinksList.map(({ id, name }) => (
          <ListItem
            key={id}
            dense
            disableGutters
            sx={(theme) => ({
              p: "0 1rem",
              [theme.breakpoints?.down("md")]: { p: "0 0.5rem" },
            })}
          >
            <Link href={`#${id}`} passHref>
              {id === "alerts" ? (
                <Typography
                  variant="h6"
                  align="center"
                  sx={(theme) => ({
                    textTransform: "capitalize",
                    color: isAlerts ? theme.palette.warning.main : grey[500],
                    fontSize: "1.0rem",
                    "&:active": isAlerts
                      ? { color: theme.palette.warning.light }
                      : undefined,
                  })}
                  onClick={(e) => {
                    console.log({ isAlerts });
                    if (isAlerts) {
                      handleScrollToId(e, `alerts`);
                      if (close) {
                        close();
                      }
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  {name}
                </Typography>
              ) : (
                <Typography
                  variant="h6"
                  align="center"
                  sx={(theme) => ({
                    textTransform: "capitalize",
                    color: theme.palette.primary.dark,
                    "&:active": { color: theme.palette.primary.main },
                    [theme.breakpoints?.down("sm")]: {
                      fontSize: "1.0rem",
                    },
                  })}
                  onClick={(e) => {
                    handleScrollToId(e, `${id}`);
                    if (close) {
                      close();
                    }
                  }}
                >
                  {name}
                </Typography>
              )}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NavContent;
