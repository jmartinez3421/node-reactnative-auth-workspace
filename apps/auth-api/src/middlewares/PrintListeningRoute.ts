import { NextFunction, Request, Response } from "express";

export const PrintListeningRoute = (req: Request, res: Response, next: NextFunction) => {
    console.log("\n-------------------------------------------------");
    console.log(`Listening route: ${req.method} ${req.url}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`);
    console.log(`Request params: ${JSON.stringify(req.params)}`);
    console.log(`Request query: ${JSON.stringify(req.query)}`);
    console.log(`Request headers: ${JSON.stringify(req.headers)}`);
    console.log(`Request cookies: ${JSON.stringify(req.cookies)}`);
    console.log(`Request ip: ${req.ip}`);
    console.log("-------------------------------------------------\n");
    next();
};
