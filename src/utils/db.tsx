import { database } from '../../firebase.config';
import { ref, set, get } from 'firebase/database';

// Create a user in Firebase Realtime Database
export async function createUserOld(firebaseUid: string, username: string): Promise<void> {
    const userRef = ref(database, 'users/' + firebaseUid);
    try {
        await set(userRef, {
            username: username,
            createdAt: new Date().toISOString(),
            profile_picture: 'https://vone-bucket.nyc3.cdn.digitaloceanspaces.com/profile_picture/default.jpg'
        });
    } catch (error) {
        console.error('Error creating user:', error);
        // Handle error, e.g., throw an error or display an error message to the user
        throw error;
    }
}

export async function createUser(firebaseUid: string, username: string): Promise<void> {
    // Replaced with server-side creation
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_IP + '/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firebaseUid, username }),
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }

        console.log('User created successfully!');
        // Redirect or display confirmation message
    } catch (err) {
        console.error('Error creating user:', err);
        // Handle error, e.g., display an error message to the user
    }
}

// Retrieve user data from Firebase Realtime Database
// eslint-disable-next-line
export async function getUserById(userId: string): Promise<any> {
    const userRef = ref(database, 'users/' + userId);
    const snapshot = await get(userRef);
    return snapshot.val();
}