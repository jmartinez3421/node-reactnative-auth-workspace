import { PrintListeningRoute } from "@/middlewares/PrintListeningRoute";
import { JWTValidator } from "@/middlewares/JwtValidator";
import { CheckErrors } from "@/middlewares/CheckErrors";
import { RequestHandler } from "express";

const privateRoute = (validators: RequestHandler[]) => [PrintListeningRoute, JWTValidator, ...validators, CheckErrors];
const publicRoute = (validators: RequestHandler[]) => [PrintListeningRoute, ...validators, CheckErrors];

export default {
    privateRoute,
    publicRoute,
};
