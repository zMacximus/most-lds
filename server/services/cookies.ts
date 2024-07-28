import { cookies } from "next/headers";

export function authCookie(isAuth: Boolean) {
  let authBool = "false";

  if (isAuth) authBool = "true";

  const cookie = cookies().set("authenticated", `${authBool}`, {
    secure: true,
    httpOnly: true,
  });
  return cookie;
}

export function getAuthCookie() {
  if (!cookies().has("authenticated")) return;

  return Boolean(cookies()?.get("authenticated")?.value);
}

export function userCookie(userId: string) {
  const cookie = cookies().set("user_id", userId, {
    secure: true,
    httpOnly: true,
  });
  return cookie;
}

export function getUserCookie() {
  if (!cookies().has("user_id")) return;

  return cookies()?.get("user_id")?.value as string;
}

export function adminCookie(isAdmin: number) {
  const cookie = cookies().set("admin", isAdmin.toString(), {
    secure: true,
    httpOnly: true,
  });
  return cookie;
}

export function getAdminCookie() {
  if (!cookies().has("admin")) return;

  return cookies()?.get("admin")?.value as string;
}
