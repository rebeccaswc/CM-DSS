"use client";

import axios from "axios";

export const getAlertAmount = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:3000/info/amount');
    if (response) {
        return response.data;
    }
  } catch (e) {
    console.error("error:", e);
    throw e;
  }
};

export const getAlertSecurityLevelAmount = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:3000/info/level');
        if (response) {
            return response.data;
        }
      } catch (e) {
        console.log("error:", e)
        throw e;
      }
}

export const getAlertTechniqueAmount = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:3000/info/technique');
        if (response) {
            return response.data;
        }
      } catch (e) {
        console.log("error:", e)
        throw e;
      }
}

export const getAlertTimeStampAmount = async () => {
  try {
      const response = await axios.get('http://127.0.0.1:3000/info/timestamp');
      if (response) {
          return response.data;
      }
    } catch (e) {
      console.log("error:", e)
      throw e;
    }
}
