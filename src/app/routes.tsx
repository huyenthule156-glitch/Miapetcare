import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/root-layout";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Products } from "./pages/products";
import { ProductDetail } from "./pages/product-detail";
import { Services } from "./pages/services";
import { PetHotel } from "./pages/pet-hotel";
import { Vaccination } from "./pages/vaccination";
import { Grooming } from "./pages/grooming";
import { BathService } from "./pages/bath-service";
import { Contact } from "./pages/contact";
import { Careers } from "./pages/careers";
import { JobDetail } from "./pages/job-detail";
import { News } from "./pages/news";
import { NewsDetail } from "./pages/news-detail";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import { Dashboard } from "./pages/dashboard";
import { DashboardPets } from "./pages/dashboard/pets";
import { DashboardRequests } from "./pages/dashboard/requests";
import { DashboardAppointments } from "./pages/dashboard/appointments";
import { DashboardServices } from "./pages/dashboard/services";
import { DashboardHotel } from "./pages/dashboard/hotel";
import { DashboardBills } from "./pages/dashboard/bills";
import { DashboardMart } from "./pages/dashboard/mart";
import { DashboardMyOrders } from "./pages/dashboard/my-orders";
import { DashboardCheckout } from "./pages/dashboard/checkout";
import { DashboardServiceBooking } from "./pages/dashboard/service-booking";
import { DashboardOrderHistory } from "./pages/dashboard/order-history";
import { AdminOverview } from "./pages/admin/overview";
import { AdminUsers } from "./pages/admin/users";
import { AdminOrders } from "./pages/admin/orders";
import { AdminReports } from "./pages/admin/reports";
import { AdminProducts } from "./pages/admin/products";
import { AdminServices } from "./pages/admin/services";
import { AdminPets } from "./pages/admin/pets";
import { VetDashboard } from "./pages/vet/dashboard";
import { VetPendingAppointments } from "./pages/vet/pending-appointments";
import { VetMyAppointments } from "./pages/vet/my-appointments";
import { StaffOverview } from "./pages/staff/overview";
import { StaffOrders } from "./pages/staff/orders";
import { StaffProducts } from "./pages/staff/products";
import { StaffServices } from "./pages/staff/services";
import { StaffBookings } from "./pages/staff/bookings";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/pet-hotel",
        element: <PetHotel />,
      },
      {
        path: "/vaccination",
        element: <Vaccination />,
      },
      {
        path: "/grooming",
        element: <Grooming />,
      },
      {
        path: "/bath-service",
        element: <BathService />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/careers",
        element: <Careers />,
      },
      {
        path: "/careers/:id",
        element: <JobDetail />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/news/:id",
        element: <NewsDetail />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/pets",
        element: <DashboardPets />,
      },
      {
        path: "/dashboard/requests",
        element: <DashboardRequests />,
      },
      {
        path: "/dashboard/appointments",
        element: <DashboardAppointments />,
      },
      {
        path: "/dashboard/services",
        element: <DashboardServices />,
      },
      {
        path: "/dashboard/hotel",
        element: <DashboardHotel />,
      },
      {
        path: "/dashboard/bills",
        element: <DashboardBills />,
      },
      {
        path: "/dashboard/mart",
        element: <DashboardMart />,
      },
      {
        path: "/dashboard/my-orders",
        element: <DashboardMyOrders />,
      },
      {
        path: "/dashboard/order-history",
        element: <DashboardOrderHistory />,
      },
      {
        path: "/dashboard/checkout",
        element: <DashboardCheckout />,
      },
      {
        path: "/dashboard/service-booking",
        element: <DashboardServiceBooking />,
      },
      // Admin routes
      {
        path: "/admin/overview",
        element: <AdminOverview />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/orders",
        element: <AdminOrders />,
      },
      {
        path: "/admin/reports",
        element: <AdminReports />,
      },
      {
        path: "/admin/products",
        element: <AdminProducts />,
      },
      {
        path: "/admin/services",
        element: <AdminServices />,
      },
      {
        path: "/admin/pets",
        element: <AdminPets />,
      },
      // Vet routes
      {
        path: "/vet/dashboard",
        element: <VetDashboard />,
      },
      {
        path: "/vet/pending-appointments",
        element: <VetPendingAppointments />,
      },
      {
        path: "/vet/my-appointments",
        element: <VetMyAppointments />,
      },
      // Staff routes
      {
        path: "/staff/overview",
        element: <StaffOverview />,
      },
      {
        path: "/staff/orders",
        element: <StaffOrders />,
      },
      {
        path: "/staff/products",
        element: <StaffProducts />,
      },
      {
        path: "/staff/services",
        element: <StaffServices />,
      },
      {
        path: "/staff/bookings",
        element: <StaffBookings />,
      },
    ],
  },
]);