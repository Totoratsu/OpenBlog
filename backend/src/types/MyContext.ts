import { Request, Response } from 'express';

export interface MyContext {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	req: Request | any;
	res: Response;
}
