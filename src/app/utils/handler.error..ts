import { of } from "rxjs";

export function handleError(error: any, action: any) {
	const errorStatus: string = error.error?.status || 'Status Error';
	const errors: any = error.error?.errors || [];
	const firstError: string = errors.length > 0 ? errors[0] : '';
	return of(action({ status: errorStatus, description: firstError }));
}