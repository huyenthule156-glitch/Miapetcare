import { Outlet } from "react-router";
import { CartProvider } from "../context/cart-context";
import { DashboardProvider } from "../context/dashboard-context";
import { InventoryProvider } from "../context/inventory-context";

export function RootLayout() {
  return (
    <DashboardProvider>
      <InventoryProvider>
        <CartProvider>
          <Outlet />
        </CartProvider>
      </InventoryProvider>
    </DashboardProvider>
  );
}
