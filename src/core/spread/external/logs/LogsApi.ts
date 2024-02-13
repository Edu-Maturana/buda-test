import axios from "axios";
import { LogsApiInterface } from "./LogsApiInterface";

class LogsApi implements LogsApiInterface {
  apiURL: string = "https://webhook.site/ec6c9f41-066b-4db0-ae39-641beff6e13d";

  async registerCall(payload?: any): Promise<void> {
    await axios.post(this.apiURL, payload);
  }
}

export default LogsApi;
