import { i18n } from "@lingui/core";
import { getCookie, getParam } from "./index";

function loadI18n() {
  const lang =
    getParam("lang") || getParam("language") || getCookie("lang") || "en";
  import(`../locales/${lang}/message.json`).then((module) => {
    console.log("i18n start", lang, module.default);
    i18n.loadAndActivate({ locale: lang, messages: module.default });
    // @ts-ignore
    window.i18n = i18n;
  });
}

loadI18n();
