export class AuthService {
    validateToken(authToken: string): boolean {
        return true;
    }

    fetchUserInfo(userId: string, authToken: string): any {
        return extUsers[userId];
    }
}

export default new AuthService();

// mock external service
export interface ExtGroupInfo {
    id: string;
    permissions: string[];
}

export interface ExtUserInfo {
    permissions: string[];
    groups: ExtGroupInfo[];
}

// sample payloads from ext service
const extUsers: Record<string, ExtUserInfo> = {
    user1: {
        permissions: ["permissionW"],
        groups: [
            {
                id: "groupA",
                permissions: ["permissionX"],
            },
            {
                id: "groupB",
                permissions: ["permissionY"],
            },
        ],
    },
    user2: {
        permissions: [],
        groups: [
            {
                id: "groupC",
                permissions: ["permissionG", "permissionW", "permissionX", "permissionY", "permissionZ"],
            },
        ],
    },
    guest: {
        groups: [],
        permissions: ["permissionZ"],
    },
};
