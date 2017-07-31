import { Headers, RequestOptions } from '@angular/http';

export class HttpHelper {

    public static RequestOptions(): RequestOptions{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({
            headers : headers
        });
        return options;
    }

    public static PutOptions(): RequestOptions {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-HTTP-Method-Override', 'PUT');
        const options = new RequestOptions({
            headers : headers
        });
        return options;
    }

}
