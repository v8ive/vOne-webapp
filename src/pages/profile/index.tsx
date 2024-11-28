import { useState, useEffect } from 'react';
import { get, ref } from 'firebase/database';
import useAuthStore from '../../store/Auth';
import { database } from '../../../firebase.config';
import { UserData } from '../../types/UserData';
import './profile.css';

function UserProfile() {
    const { user, isLoading, error } = useAuthStore();

    const [userData, setUserData] = useState<UserData | null>(null);

    const userRef = ref(database, 'users/' + user?.uid);
    const bankRef = ref(database, 'banks/' + user?.uid);
    const levelRef = ref(database, 'levels/' + user?.uid);

    useEffect(() => {
        const getUserData = async () => {
            const userSnapshot = await get(userRef);
            const bankSnapshot = await get(bankRef);
            const levelSnapshot = await get(levelRef);

            setUserData({
                username: userSnapshot.val()?.username,
                xp: levelSnapshot.val()?.xp,
                lux: bankSnapshot.val()?.lux,
                nox: bankSnapshot.val()?.nox,
            });
        };

        if (user) {
            getUserData();
        }
    }, [user]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!user) return <p>Please sign in.</p>;

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <div className="user-details">
                <p>Username: {userData?.username}</p>
                <p>Lux : {userData?.lux}</p>
                <p>Nox : {userData?.nox}</p>
                <p>Email: {user.email}</p>
            </div>
        </div>
    );
}

export default UserProfile;