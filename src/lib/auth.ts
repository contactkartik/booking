export type User = { id: string; email: string; token?: string };

const KEY = 'bk_user';

export function setCurrentUser(user: User | null) {
  if (!user) {
    localStorage.removeItem(KEY);
  } else {
    localStorage.setItem(KEY, JSON.stringify(user));
  }
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as any) : null;
    if (!parsed) return null;
    // Backward compatibility if a previous version saved without token
    return { id: parsed.id, email: parsed.email, token: parsed.token } as User;
  } catch {
    return null;
  }
}
