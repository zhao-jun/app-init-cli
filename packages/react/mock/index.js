import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import homeData from "./data/home"; // 导入Todos数据
import { Config } from "../config";

let mock = new MockAdapter(axios);

mock.onGet(`${Config.baseApi}/home/list`).reply(200, homeData);
