"use client";

import { useDrop } from 'react-dnd';
import { Order } from '../types';

/**
 * Drop Area Component
 * 
 * This component serves as the foam sheet visualization area where users
 * can drop dragged orders from the queue. It correctly positions the image
 * based on the user's drop location.
 * 
 * Props:
 * - dropRef: A reference to the drop area (foam sheet container).
 * - nestedItems: The list of orders currently placed in the foam sheet.
 * - setNestedItems: A function to update the list of nested items.
 * - setSelectedNestedItemId: Function to set the most recently added nested item's ID.
 * - selectedFoam: The type of foam currently selected by the user.
 * 
 * @returns Elements of the UI in the "Foam Sheet Visualization" section.
 */

export default function DropArea({
    dropRef,
    nestedItems,
    setNestedItems,
    setSelectedNestedItemId,
    selectedFoam,
}: {
    dropRef: React.RefObject<HTMLDivElement | null>;
    nestedItems: Order[];
    setNestedItems: React.Dispatch<React.SetStateAction<Order[]>>;
    setSelectedNestedItemId: React.Dispatch<React.SetStateAction<number | null>>;
    selectedFoam: string;
}) {
    /**
     * Sets up the drop behavior using React DnD
     * - Accepts items of type "ORDER".
     * - Calculates the drop position relative to the foam sheet.
     * - Updates the list of nested items with the new droppped order.
     */
    const [{ isOver }, drop] = useDrop<Order, void, { isOver: boolean}>({
        accept: "ORDER",
        drop: (item: Order, monitor) => {
            const offset = monitor.getClientOffset(); // Get drop location.
            const boundingRect = dropRef.current?.getBoundingClientRect();
            if (offset && boundingRect) {
                // Calculate the item's new position inside the foam sheet.
                const x = offset.x - boundingRect.left;
                const y = offset.y - boundingRect.top;

                const newItem = { ...item, x, y };
                
                // Add the dropped item to the list and auto-select it.
                setNestedItems((prev) => {
                    const updatedItems = [...prev, newItem];
                    setSelectedNestedItemId(newItem.id); // Auto select the latest nested item.
                    return updatedItems;
                });
            }
        },
        collect: (monitor) => ({ isOver: !!monitor.isOver() }), // Highlight area when an item is dragged over.
    });

    // Attach the drop functionality to the ref.
    drop(dropRef);

    return(
        <div
            ref={dropRef}
            className={`relative w-full h-full ${isOver ? "bg-gray-300" : ""}`} // Hightlights when an item is being dragged over
        >
            {/**Foam Sheet Title*/}
            <p className="text-gray-900 text-center font-bold text-xl">Foam Sheet Visualization</p>
            {/**Foam Sheet Image*/}
            <img
                src={`/placeholder3D-${selectedFoam}.png`}
                alt= "3D Model"
                className="w-full max-w-2xl mx-auto"
            />
            {/**Render all nested items in their respective positions*/}
            {nestedItems.map((item) => (
                <img
                    key={item.id}
                    src={item.image}
                    alt="Nested Item"
                    className="absolute w-12 h-12"
                    style={{
                        top: `${item.y}px`,
                        left: `${item.x}px`,
                        transform: `rotate(${item.rotation}deg)`, // Apply rotation.
                    }}
                />
            ))}
        </div>
    );
}