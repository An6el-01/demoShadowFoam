" use client";

import { useDrag } from 'react-dnd';
import { Order } from '../types';

/**
 * Draggable Order Component
 * 
 * This component represents an order that can be dragged from the queue
 * and placed onto the foam sheet visualization.
 * 
 * Props:
 * - order: The order object containing ID, priority, image, foam type, and position.
 * - foamType: The currently selected foam type.
 * 
 * @returns - Elements of the order card UI.
 */

export default function DraggableOrder({
    order, 
    foamType,
}: {
    order: Order;
    foamType: string;
}) {
    // Sets up drag behavior using React DnD.
    const [, dragRef] = useDrag<Order, void, unknown>({
        type: 'ORDER', // Specifies the drag type.
        item: order,  // The data being passed during the drag.
    });

    /**
     * Combines the drag reference with the element reference
     * to enable drag functionality.
     */
    const combinedRef = (node: HTMLDivElement | null) => {
        if (node) {
            dragRef(node);
        }
    };

    return(
        <div
            ref={combinedRef}
            className={`p-4 border rounded shadow hover:bg-blue-400 ${
            order.foamType === foamType ? "bg-yellow-500" : "bg-gray-600"
            }`}
        >
            {/**Displays Order ID*/}
            <p className="text-white">Order ID: {order.id}</p>
            {/**Displays Order Priority*/}
            <p className="text-white">Priority: {order.priority}-day shipping</p>
            {/**Displays Order Image*/}
            <img
                src={order.image}
                alt="Order Item"
                className='w-16 h-16 mx-auto mt-2'
            />        
        </div>
    );
}