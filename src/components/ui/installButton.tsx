import { Button } from '@radix-ui/themes';
import { useState, useEffect } from 'react';

function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        window.addEventListener("appinstalled", () => {
            localStorage.setItem('isInstalled', 'true');
            setIsInstalled(true);
        });

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        }
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        if (window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone ||
            document.referrer.startsWith('android-app://')) {
            setIsInstalled(true);
        }

        const isInstalled = localStorage.getItem('isInstalled');
        if (isInstalled) {
            setIsInstalled(true);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
            }
        }
    };

    if (isInstalled) {
        return null; // Don't show the button if it was already installed
    } else {
        return (
            <Button onClick={handleInstallClick} disabled={!deferredPrompt}>
                Install App
            </Button>
        );
    }
}

export default InstallButton;