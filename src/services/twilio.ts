import axios from "axios";

export const api = axios.create({
  baseURL: `https://verify.twilio.com/v2/Services/${process.env.TWILIO_SERVICE}/`,
});
