import { API_BASE_URL } from "../constants";
import { TokenResponse, ReadingDataResponse, ApiErrorResponse } from "../types";

class HamelnApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleError(response: Response): Promise<never> {
    const errorData: ApiErrorResponse = await response.json();
    throw new Error(
      `API Error (${errorData.error.code}): ${errorData.error.message}`
    );
  }

  async login(userId: string, password: string): Promise<TokenResponse> {
    const response = await fetch(`${this.baseUrl}/api/v3/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        credentials: {
          user_id: userId,
          password: password,
        },
      }),
    });

    if (!response.ok) {
      await this.handleError(response);
    }

    return (await response.json()) as TokenResponse;
  }

  async getReadingData(
    token: string,
    yearFrom: number = 2024,
    yearTo?: number
  ): Promise<ReadingDataResponse> {
    const params = new URLSearchParams();
    params.append("year_from", yearFrom.toString());
    if (yearTo) {
      params.append("year_to", yearTo.toString());
    }
    params.append("use_cache", "true");

    const response = await fetch(
      `${this.baseUrl}/api/v3/reading-data?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      await this.handleError(response);
    }

    return (await response.json()) as ReadingDataResponse;
  }

  async getMonthReadingData(
    token: string,
    year: number,
    month: number
  ): Promise<ReadingDataResponse> {
    const params = new URLSearchParams();
    params.append("year", year.toString());
    params.append("month", month.toString());

    const response = await fetch(
      `${this.baseUrl}/api/v3/month-reading-data/basic?${params.toString()}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      await this.handleError(response);
    }

    return (await response.json()) as ReadingDataResponse;
  }
}

export const hamelnApiService = new HamelnApiService(API_BASE_URL);
