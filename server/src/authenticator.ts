import { CustomAuthenticator } from "@glue42/server";
import { User, Token } from "@glue42/server-api";
import { Request, Response } from "express";
import extAuth from "./ExtServices/AuthService";
import cache from "./ExtServices/CacheService";
import mapping from "./ExtServices/MappingService"

export class Authenticator implements CustomAuthenticator {
    initialize(): void {}

    async authenticate(
        req: Request,
        res: Response,
        next: (err?: Error, info?: User) => void,
        token?: Token
    ): Promise<void> {
        // TEST ONLY: special handling of the admin user for requests coming from the sample Admin UI app
        if (req.headers.authorization === "Bearer user:admin") {
            const adminUser = {
                id: "admin",
                apps: [],
                groups: [],
            };
            next(undefined, adminUser);
            return;
        }

        // get user id and token, validate the token
        const [userId, authToken] = this.extractUserAndToken(req);
        if (!userId) {
            next(this.unauthorized("User id not provided"));
            return;
        }
        if (!extAuth.validateToken(authToken)) {
            next(this.unauthorized("Could not validate auth token"));
            return;
        }

        // get user info from cache or from the external service
        let userInfo: User | undefined = cache.getUser(userId);
        if (!userInfo) {
            const extInfo = extAuth.fetchUserInfo(userId, authToken);
            if (!extInfo) {
                next(this.unauthorized("Could not obtain user information"));
                return;
            }
            userInfo = mapping.extInfoToUserInfo(userId, extInfo)
            cache.updateUser(userId, userInfo);
        }

        console.log("Effective user info:", JSON.stringify(userInfo, undefined, 2))

        // pass the validated user info down the processing chain
        next(undefined, userInfo);
    }

    private extractUserAndToken(req: Request): [string, string] {
        // extract auth token
        const authItems = req.headers.authorization?.split(" ");
        const authToken =
            Array.isArray(authItems) && authItems[0] === "Bearer" ? authItems[1] : "";

        // extract user id
        const userId = typeof req.headers.user === "string" ? req.headers.user : "";

        return [userId, authToken];
    }

    private unauthorized(message?: string) {
        message ||= "Unauthorized";
        return {
            statusCode: 401,
            name: "UnauthorizedError",
            message,
        } as Error;
    }
}
