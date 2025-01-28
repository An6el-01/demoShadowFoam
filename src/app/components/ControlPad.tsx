"use client";
/**
 * Control Pad Component
 * 
 * This Component provides a game-like control pad that allows users to
 * move and rotate a selected nested item within the base foam sheet visualization.
 * 
 * Props:
 * - moveSelectedItem: Function to move the selected item by a specified x/y offset.
 * - rotateSelectedItem: Function to rotate the selected item by 90 degrees.
 * 
 * @returns - Elements in the UI of the Control Pad.
 */
export default function ControlPad({
    moveSelectedItem,
    rotateSelectedItem,
}: {
    moveSelectedItem: (dx: number, dy: number) => void;
    rotateSelectedItem: () => void;
}) {
    return(
        <div className="relative w-40 h-40 bg-gray-600 rounded-full flex flex-wrap items-center justify-center left-14">
            {/**Move Up Button*/}
            <button
                onClick={() => moveSelectedItem(0, -10)}
                className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-400 w-10 h-10 rounded-lg"
            >
                ▲
            </button>
            {/**Rotate Button*/}
            <button
                onClick={rotateSelectedItem}
                className="absolute bg-blue-500 w-10 h-10 rounded-full"
            >
                ↺
            </button>
            {/**Move Down Button*/}
            <button
                onClick={() => moveSelectedItem(0, 10)}
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-400 w-10 h-10 rounded-lg"
            >
                ▼
            </button>
            {/**Move Left Button*/}
            <button
                onClick={() => moveSelectedItem(-10, 0)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-400 w-10 h-10 rounded-lg"
            >
                ◀
            </button>
            {/**Move Right Button*/}
            <button
                onClick={() => moveSelectedItem(10, 0)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-400 w-10 h-10 rounded-lg"
            >
                ▶
            </button>
        </div>
    );
}