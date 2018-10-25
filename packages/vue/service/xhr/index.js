import axios from "axios";
import { Config } from "../../config";

export default (type, url, param = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .create({
        baseURL: Config.baseApi
      })
      [type](url, param)
      .then(res => {
        const response = res.data;
        if (+response.code === 0) {
          resolve(response.data);
        } else {
          console.log("reject", res);
          // toast提示 todo
          // reject()
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};
