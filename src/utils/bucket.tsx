import axios from 'axios'; // Assuming you're using axios for HTTP requests

export async function uploadProfilePicture(image: File, userUid: string): Promise<string | undefined> {
    if (!image) {
        console.error('No image file selected');
        return undefined;
    }

    const formData = new FormData();
    formData.append('file', image); // Assuming the backend expects 'file' key
    formData.append('filename', userUid); // Assuming the backend expects 'userUid' key

    console.log('Uploading image:', image);

    try {
        const response = await axios.post(import.meta.env.VITE_BACKEND_IP + '/upload/profile-picture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set appropriate content type
            }
        });
        console.log('Received data:', response.data);
        return response.data.url;
    } catch (error) {
        console.error('Error uploading image:', error);
        return undefined;
    }
}