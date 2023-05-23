import { User } from "@glue42/server-api";
import { ExtUserInfo } from "./AuthService";

type Flatten<Type> = Type extends Array<infer ItemType> ? ItemType : Type;
type LayoutT = NonNullable<Flatten<User["layouts"]>>;
class MappingService {
    mapPermissions(extPermissions: string[]): [string[], LayoutT[]] {
        const appSet: Record<string, string> = {};
        const layoutSet: Record<string, LayoutT> = {};
        for (const id of extPermissions) {
            const permission: PermissionMapping = samplePermissionMappings[id] || {
                apps: [],
                layouts: [],
            };
            for (const app of permission.apps) {
                appSet[app] = app;
            }
            for (const layout of permission.layouts as any[]) {
                const key = layout.id || `${layout.type}-${layout.name}`;
                layoutSet[key] = layout;
            }
        }
        return [Object.values(appSet), Object.values(layoutSet)];
    }
    extInfoToUserInfo(userId: string, extInfo: ExtUserInfo): User {
        const groups: string[] = [];
        const permissionList = [...extInfo.permissions];
        for (const group of extInfo.groups) {
            group.id && groups.push(group.id);
            permissionList.push(...group.permissions);
        }
        const [apps, layouts] = this.mapPermissions(permissionList);
        return {
            id: userId,
            apps,
            groups,
            layouts,
        };
    }
}

export default new MappingService();

// mock external service
interface PermissionMapping {
    apps: string[];
    layouts: LayoutT[];
}
const samplePermissionMappings: Record<string, PermissionMapping> = {
    permissionG: {
        apps: [],
        layouts: [{ type: "Global", name: "Global01" }],
    },
    permissionW: {
        apps: [],
        layouts: [{ type: "Workspace", name: "Workspace01" }],
    },
    permissionX: {
        apps: ["app01", "app02"],
        layouts: [],
    },
    permissionY: {
        apps: ["app01", "app03"],
        layouts: [],
    },
    permissionZ: {
        apps: ["app99"],
        layouts: [],
    },
};
