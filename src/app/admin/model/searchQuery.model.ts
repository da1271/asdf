export class SearchQuery {
    //--- user details

    firstname: string;
    lastname: string;
    email: string;
    username: string;
    group: string[];


    //--- Quick filter
    // filter: string[];

    //--- page info
    pageno: number;
    pagesize: number;

    //--- sorting
    sortby: string;
    sortorder: string;
}
