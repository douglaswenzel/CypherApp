import axios from "axios";

import { config } from "../config/env";

export const api = axios.create({
  baseURL: config.baseUrl,
});
