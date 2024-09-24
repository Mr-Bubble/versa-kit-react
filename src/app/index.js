import { http } from "./api/http";

export function postXmPorts(params) {
  return http.request({
    url: "https://api.yyink.cn/api/mi",
    method: "get",
    params
  });
}
