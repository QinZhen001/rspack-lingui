/**
 * 获取cookie
 * @param name  cookie名称
 * @returns  cookie值
 */
export function getCookie(name: string): string {
    const r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
    const m = window.document.cookie.match(r);
    return !m ? "" : m[1];
  }
  
  /**
   * 获取URL参数
   * @param paramName 参数名称
   * @returns 参数值
   */
  export function getParam(paramName: string): string {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName) || "";
  }