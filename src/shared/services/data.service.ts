export class DataService {
    private headers: Headers;


    private appendHeaders(extraHeaders?: any, isUpload: boolean = false) {
        if (extraHeaders) {
            this.headers = new Headers(extraHeaders);
        }
        else {
            this.headers = new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            });

            if (isUpload) {
                this.headers.delete('content-type');
            }

        }
    }

    public get = (url: string) => {
        this.appendHeaders();
        return fetch(`${url}`, {
            headers: this.headers,
            method: "GET"
        }).then(this.processResponse);
    };

    public post = (url: string, body: any, extraHeaders?: Headers, isEncoded: boolean = false) => {
        this.appendHeaders(extraHeaders);

        return fetch(`${url}`, {
            body: isEncoded ? body : JSON.stringify(body),
            headers: this.headers,
            method: "POST"
        }).then(this.processResponse)
    };

    public put = (url: string, body: any) => {

        return fetch(`${url}`, {
            body: JSON.stringify(body),
            headers: this.headers,
            method: "PUT"
        }).then(this.processResponse);
    };

    public delete = (url: string, body?: any) => {

        return fetch(`${url}`, {
            body: JSON.stringify(body),
            headers: this.headers,
            method: "DELETE"
        }).then(this.processResponse);
    };

    private processResponse(response: Response) {

        return new Promise((resolve, reject) => {
            // will resolve or reject depending on status, will pass both "status" and "data" in either case
            let func: any;

            response.status < 400 ? (func = resolve) : (func = reject);

            if (response.status === 401 && response.url.search('oauth/token') === -1) {
                window.location.href = window.location.origin + '/';
                localStorage.clear();
                return;
            }

            return response
                .json()
                .then(data => func(data))
                .catch(data => func(data));
        });
    }

}