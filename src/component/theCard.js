import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { changeResult, fetchWeather } from "../features/temp/tempSlice";
import CircularProgress from "@mui/material/CircularProgress";

export default function TheCard() {
  const [changeLanguage, setChangeLanguage] = useState("en");

  const temp = useSelector((state) => {
    return state.temp.weather;
  });

  const isLoading = useSelector((state) => {
    return state.temp.isLoading;
  });

  const dispatch = useDispatch();

  function handlerChangeLanguage() {
    if (changeLanguage === "ar") {
      i18n.changeLanguage("en");
      setChangeLanguage("en");
      moment.locale("en");
    } else if (changeLanguage === "en") {
      i18n.changeLanguage("ar");
      setChangeLanguage("ar");
      moment.locale("ar");
    }
    setTime(moment().format("LLL")); // Get the time in Arabic
  }
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(changeLanguage);
  }, [i18n]);

  dispatch(changeResult());

  const [time, setTime] = useState("");

  useEffect(() => {
    dispatch(fetchWeather());
  }, []);

  return (
    <>
      <Box
        sx={{
          minWidth: 275,
          width: "35%",
          height: "40%",
        }}
      >
        <Card
          dir={changeLanguage === "en" ? "rtl" : "ltr"}
          variant="outlined"
          style={{
            backgroundColor: "rgb(28 52 91/ 36%",
            color: "white",
          }}
        >
          <CardContent>
            {/* city & time */}
            <div
              dir={changeLanguage === "ar" ? "rtl" : "ltr"}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                color: "white",
              }}
            >
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 50,
                  margin: 0,
                }}
                style={{
                  color: "white",
                }}
              >
                {t("Alexandria")}
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 20,
                  margin: 0,
                }}
                style={{
                  color: "white",
                }}
              >
                {time}
              </Typography>
            </div>
            {/*=== city & time ===*/}
            <hr />
            {/* degree & description */}
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {/* temp */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* degree & photoFromAPI */}
                <div
                  dir={changeLanguage === "ar" ? "rtl" : "ltr"}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: 40,
                      margin: 0,
                    }}
                    style={{
                      color: "white",
                    }}
                  >
                    <h1
                      style={{
                        fontFamily: "IBM",
                        fontWeight: "300",
                        margin: "0",
                      }}
                    >
                      {temp.responseTemp}
                      {isLoading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        ""
                      )}
                    </h1>
                  </Typography>
                  <div>
                    <img
                      src={`https://openweathermap.org/img/wn/${temp.responseIcon}@2x.png`}
                    />
                  </div>
                </div>
                {/* state of weather */}
                <div>
                  <h4 style={{ margin: "0" }}>{t(temp.responseState)}</h4>
                </div>
                {/* min & max weather */}
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h5>
                      {t("min")}: <span>{temp.responseTempMin}</span>
                    </h5>
                  </div>
                  <div>|</div>
                  <div>
                    <h5>
                      {t("max")}: <span>{temp.responseTempMax}</span>
                    </h5>
                  </div>
                </div>
              </div>

              {/* icon */}
              <div>
                <CloudIcon style={{ fontSize: "100px" }} />
              </div>
            </div>
            {/*=== degree & description ===*/}
          </CardContent>
        </Card>
        <div
          dir={changeLanguage === "ar" ? "rtl" : "ltr"}
          style={{ width: "100%", display: "flex" }}
        >
          <Button
            style={{ color: "white" }}
            variant="text"
            onClick={handlerChangeLanguage}
          >
            {changeLanguage === "ar" ? "إنجليزي" : "Arbic"}
          </Button>
        </div>
      </Box>
    </>
  );
}
