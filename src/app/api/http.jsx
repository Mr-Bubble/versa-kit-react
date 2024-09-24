import Axios from "axios";
import React from "react";
import { Snackbar, Alert } from "@mui/material";
import ReactDOM from "react-dom/client";

// 默认 axios 实例请求配置
const configDefault = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  timeout: 60000,
  baseURL: '',
  data: {}
};

class Http {
  constructor(config) {
    Http.axiosConfigDefault = config;
    Http.axiosInstance = Axios.create(config);
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  // 当前实例
  static axiosInstance;
  // 请求配置
  static axiosConfigDefault;

  // 请求拦截
  httpInterceptorsRequest() {
    Http.axiosInstance.interceptors.request.use(
      config => config,
      error => {
        this.showError(error.message);
        return Promise.reject(error);
      }
    );
  }

  // 响应拦截
  httpInterceptorsResponse() {
    Http.axiosInstance.interceptors.response.use(
      response => {
        return response.data
      },
      error => {
        let message = "";
        const status = error.response?.status;
        switch (status) {
          case 400:
            message = "请求错误";
            break;
          case 401:
            message = "未授权，请登录";
            break;
          case 403:
            message = "拒绝访问";
            break;
          case 404:
            message = `请求地址出错: ${error.response?.config?.url}`;
            break;
          case 408:
            message = "请求超时";
            break;
          case 500:
            message = "服务器内部错误";
            break;
          default:
            message = "网络连接故障";
        }

        this.showError(message);
        return Promise.reject(error);
      }
    );
  }

  // 显示错误提示
  showError(message) {
    let open = true

    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = ReactDOM.createRoot(container); // 使用 createRoot

    const handleClose = () => {
      open = false
      root.unmount();
      document.body.removeChild(container);
    };

    root.render(
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    );
  }

  // 通用请求函数
  request(paramConfig) {
    const config = { ...Http.axiosConfigDefault, ...paramConfig };
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

// 导出实例化后的 http 请求类
export const http = new Http(configDefault);
