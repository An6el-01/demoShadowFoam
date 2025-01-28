"use client";

/**
 * Loading Screen Component
 * 
 * This component displays a loading screen overlay when a specific action is in progress (e.g., "Continue").
 * It provides a user-friendly message to indicate the current status and an option to close the overlay.
 * 
 * Props:
 * - message: A string containing the message to display on the loading screen.
 * - close: A function to handle closing the loading screen.
 * 
 * @returns - Elements of the loading component UI. 
 */
export default function LoadingScreen({
    message,
    close,
}: {
    message: string, // The message to display on the loading screen.
    close: () => void; // Function to close the loading screen.
}) {
    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            {/**Overlay Container*/}
            <div className="bg-white p-6 rounded-lg shadow-lg relative h-40">
                {/**Close Button to dismiss the loading screen*/}
                <button
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                    onClick={close}
                >
                    X
                </button>
                {/**Message displaying the current loading status*/}
                <p className="text-lg font-bold text-gray-800 m-11">{message}</p>
            </div>
        </div>
    );
}