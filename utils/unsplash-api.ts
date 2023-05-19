import { createApi } from "unsplash-js";

const ACCESS_KEY = `FZWzzl46crLfrJegoNXCNh3CoO2MKLM20SLJz9Bm9x8` // Better to implement in .ENV

export const unsplashAPI = createApi({
  accessKey: ACCESS_KEY,
})