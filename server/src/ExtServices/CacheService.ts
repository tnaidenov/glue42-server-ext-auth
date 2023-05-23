import { User } from "@glue42/server-api";

class CacheService {
    getUser(userId: string): User | undefined {
        // TODO
        return undefined;
    }

    updateUser(userId: string, userInfo: User) {}
}

export default new CacheService()
