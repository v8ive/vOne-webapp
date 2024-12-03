
export function extractDiscordIdFromAvatarUrl(avatarUrl: string) {
    const urlParts = avatarUrl.split('/');
    const userId = urlParts[4];
    return userId;
}