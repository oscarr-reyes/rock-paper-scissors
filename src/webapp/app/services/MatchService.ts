import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import Match from "../classes/Match";

@Injectable()
export class MatchService {
	private baseURL: string;

	constructor(private http: HttpClient) {
		this.baseURL = "/api/matches";
	}

	getMatches(): Observable<Match[]> {
		return this.http.get<Match[]>(this.baseURL);
	}

	createMatch(match: Match): Observable<any> {
		return this.http.post(this.baseURL, match);
	}
}
