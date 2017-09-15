import { UserDetails } from "./userDetails.model";

export class SearchResults {
    "totalOrderCount": number;
    "totalPageCount": number;
    "currentPageNo": number;
    "currentPageSize": number;
    "users": UserDetails[];
}
