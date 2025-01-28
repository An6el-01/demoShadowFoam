"use client";

// Import necessary libraries and components
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DraggableOrder from "../components/DraggableOrder";
import DropArea from "../components/DropArea";
import ControlPad from "../components/ControlPad";
import LoadingScreen from "../components/LoadingScreen";
import { Order } from "../types";

// Mock data for foam sheet types and order images.
const foamTypes = ["red", "blue", "green"];
const orderImages = [
  "/circle.png",
  "/stars1.png",
  "/circle2.png",
  "/star2.png",
  "/cloud.png",
  "/heart.png",
  "/cross.png",
];

export default function Dashboard() {
  const router = useRouter(); // Next.js router for navigation.
  const [orders, setOrders] = useState<Order[]>([]); // State to manage order queue.
  const [selectedFoam, setSelectedFoam] = useState("red"); // Currently selected foam sheet.
  const [nestedItems, setNestedItems] = useState<Order[]>([]); // Items nested in the foam sheet.
  const [selectedNestedItemId, setSelectedNestedItemId] = useState<number | null>(null); // Selected nested item ID.
  const [nextOrderId, setNextOrderId] = useState(1); // Counter for unique order IDs
  const [loadingScreen, setLoadingScreen] = useState<string | null>(null); // Loading screen message.
  const dropRef = useRef<HTMLDivElement | null>(null); // Ref for the drop area.

  // Effect to periodically add new orders to the queue.
  useEffect(() => {
    const interval = setInterval(() => {
      const newOrder: Order = {
        id: nextOrderId,
        priority: Math.floor(Math.random() * 3) + 1, // Random priority.
        image: orderImages[Math.floor(Math.random() * orderImages.length)], // Random Image.
        foamType: foamTypes[Math.floor(Math.random() * foamTypes.length)], // Random foam type.
        x: 50, // Initial X position.
        y: 50, // Initial Y position.
        rotation: 0, // Initial rotation.
      };
      setOrders((prevOrders) => [...prevOrders, newOrder].sort((a, b) => a.priority - b.priority)); // Add order and sort by priority.
      setNextOrderId((prevId) => prevId + 1); // Increment order ID.
    }, 25000); // Interval of 25 secs.
    return () => clearInterval(interval); // Cleanup on unmount.
  }, [nextOrderId]);

  /**
   * Handle logout and redirect to the login page.
   */
  const handleLogout = () => {
    router.push("/");
  };

  /**
   * Move the selected item by a specific offset
   * @param dx X-axis
   * @param dy Y-axis
   */
  const moveSelectedItem = (dx: number, dy: number) => {
    setNestedItems((items) =>
      items.map((item) =>
        item.id === selectedNestedItemId ? { ...item, x: item.x + dx, y: item.y + dy } : item
      )
    );
  };

  /**
   * Rotate the selected item by 90 degrees.
   */
  const rotateSelectedItem = () => {
    setNestedItems((items) =>
      items.map((item) =>
        item.id === selectedNestedItemId ? { ...item, rotation: (item.rotation + 90) % 360 } : item
      )
    );
  };

  /**
   * Clear all the nested items from the foam sheet visualization area.
   */
  const clearNestedItems = () => {
    setNestedItems([]);
  };


  /**
   * Handle the "Continue" button click, simulating the cutting process.
   */
  const handleContinue = () => {
    // Remove nested items from the order queue.
    setOrders((prevOrders) => prevOrders.filter((order) => !nestedItems.find((nested) => nested.id === order.id)));
    clearNestedItems(); // Clear the foam sheet.
    setLoadingScreen("Cut in progress..."); // Display loading message.
    setTimeout(() => {
      setLoadingScreen("Cut finished, please go back."); // Update message after 5 secs.
    }, 5000);
  };

  /**
   * Close the loading screen.
   */
  const closeLoadingScreen = () => {
    setLoadingScreen(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-800 text-white flex flex-col">
        {/**Header Section*/}
        <header className="flex justify-between items-center p-6 bg-gray-900">
          <div className="flex items-center">
            <img src="/logo2.png" alt="logo" className="h-12 mr-4" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <button className="bg-red-600 px-4 py-2 rounded" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <div className="flex flex-1 p-8 gap-6">
          {/**Orders Panel*/}
          <div className="w-1/4 bg-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-center">Order Queue</h2>
            <div className="space-y-2 overflow-auto max-h-[940px]">
              {orders.map((order) => (
                <DraggableOrder key={order.id} order={order} foamType={selectedFoam} />
              ))}
            </div>
          </div>

          {/**Foam Sheet Visualization*/}
          <div ref={dropRef} className="flex-1 bg-white rounded-lg shadow flex flex-col items-center p-10">
            <DropArea
              dropRef={dropRef}
              nestedItems={nestedItems}
              setNestedItems={setNestedItems}
              setSelectedNestedItemId={setSelectedNestedItemId}
              selectedFoam={selectedFoam}
            />
            <div className="mt-4 space-x-4">
              <button className="bg-green-600 px-4 py-2 rounded" onClick={handleContinue}>
                Continue
              </button>
              <button className="bg-red-600 px-4 py-2 rounded" onClick={clearNestedItems}>
                Clear
              </button>
            </div>
          </div>

          {/**Controls Panel*/}
          <div className="w-1/4 bg-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-center">Controls</h2>
            <div className="space-y-4">
              <label className="block text-gray-300 mb-2">Select Foam Sheet</label>
              <select
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                value={selectedFoam}
                onChange={(e) => setSelectedFoam(e.target.value)}
              >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>

              <label className="block text-gray-300 mb-2">Select Nested Item</label>
              <select
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                value={selectedNestedItemId || ""}
                onChange={(e) =>
                  setSelectedNestedItemId(e.target.value ? parseInt(e.target.value) : null)
                }
              >
                <option value="">Select Item</option>
                {nestedItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    Order ID: {item.id}
                  </option>
                ))}
              </select>
              {/**Control Pad*/}
              <ControlPad moveSelectedItem={moveSelectedItem} rotateSelectedItem={rotateSelectedItem} />
            </div>
          </div>
        </div>
        {/**Loading Screen*/}
        {loadingScreen && <LoadingScreen message={loadingScreen} close={closeLoadingScreen} />}
      </div>
    </DndProvider>
  );
}
