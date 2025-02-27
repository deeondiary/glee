import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const goMainPage = (router: AppRouterInstance | string[]) => {
    router.push("/");
}