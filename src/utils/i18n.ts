import { i18n } from "@lingui/core";
import { getCookie, getParam } from "./index";

async function loadI18n() {
  const lang =
    getParam("lang") || getParam("language") || getCookie("lang") || "fr";
  const { messages } = await import(`../locales/${lang}/messages.ts`);
  console.log("[i18n] loadAndActivate", lang, messages);
  i18n.loadAndActivate({ locale: lang, messages });
  // @ts-ignore
  window.i18n = i18n;
}

loadI18n();
