import { http } from "./http";

export function postXmPorts(params) {
  return http.request({
    url: "https://api.yyink.cn/api/mi",
    method: "get",
    params
  });
}
