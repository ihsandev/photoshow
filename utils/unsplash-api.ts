import { createApi } from "unsplash-js";

const ACCESS_KEY: any = process.env.ACCESS_KEY;

export const unsplashAPI = createApi({
  accessKey: ACCESS_KEY,
});
