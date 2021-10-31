import * as dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default {
  install: app => {
    Object.defineProperties(app.config.globalProperties, {
      $date: {
        get() {
          return dayjs;
        }
      }
    });
  }
};
