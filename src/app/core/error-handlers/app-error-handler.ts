import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        alert('An unexpected error occured.'); // log all the unexpected errors
        console.log(error);
    }
}
