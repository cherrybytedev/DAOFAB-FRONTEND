import axios from "axios";

type methodType = "get" | "post" | "patch" | "delete";

const baseURL = "http://localhost:3000/"


export const axiosRequest = async (
  method_: methodType,
  url_: string,
  body?: any,
  params_?: any
) => {
  const URL = baseURL + url_;
  const response = await axios({
    method: method_,
    url: URL,
    data: body,
    params: params_,
  });

  return response;
};

export { baseURL };
