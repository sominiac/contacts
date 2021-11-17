class AjaxRequest {
    constructor(method, url) {
        this.method = method;
        this.url = url;

        this.serverRequest = new XMLHttpRequest();
    }

    // getServerState() {
    //     if (this.serverRequest.readyState == 0) {
    //         this.serverState = 'UNSENT';
    //     } else if(this.serverRequest.readyState == 1) {
    //         this.serverState = 'OPENED';
    //     } else if(this.serverRequest.readyState == 2) {
    //         this.serverState = 'Request send';
    //     } else if(this.serverRequest.readyState == 3) {
    //         this.serverState = 'LOADING';
    //     } else if(this.serverRequest.readyState == 4) {
    //         return 'DONE';
    //     }
    // }

    serverConnection() {
        this.serverRequest.open(this.method, this.url, true);
        this.serverRequest.send();
    }

    getServerResponse() {
        return new Promise((resolve, reject) => {
            this.serverConnection();

            this.serverRequest.onreadystatechange = () => {
                if (this.serverRequest.readyState == 4 && this.serverRequest.status == 200) {
                    resolve(this.serverRequest.response);
                } else if(this.serverRequest.status !== 200) {
                    reject(new Error(`Server status ${this.serverRequest.status}`));
                }
            }
        })
    }
}