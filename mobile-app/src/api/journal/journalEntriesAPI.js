import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../../../config";
const API = EXPO_PUBLIC_BASE_URL + "journalEntries/";

class JournalEntriesAPI {
  static async getJournalEntriesForToday(token, dateStamp) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { dateStamp: dateStamp },
    });
    return response?.data;
  }

  static async getJournalEntriesForMultipleDays(token, startDate, endDate) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { startDate: startDate, endDate: endDate },
    });
    return response?.data;
  }

  // Returns { ID } — the entry's SK, used for update and delete.
  static async createJournalEntry(token, journalEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(API, journalEntry, { headers: headers });
    return response?.data;
  }

  static async updateJournalEntry(token, journalEntryID, journalEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + journalEntryID;

    await axios.put(url, journalEntry, { headers: headers });
  }

  static async deleteJournalEntry(token, journalEntryID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + journalEntryID;

    await axios.delete(url, { headers: headers });
  }
}
export default JournalEntriesAPI;
