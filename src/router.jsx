import { createBrowserRouter } from "react-router-dom";

// Main page Stuff Imports
import HomeScreen from "./screens/landingPage/Home";
import AuthLayout from "./screens/login/AuthLayout";
import NotFoundPage from "./components/Error404"; 
import DashBoardLayout from "./screens/dashboard/DashBoardLayout";
import LoginScreen from "./screens/login/LoginScreen";
import SignupScreen from "./screens/login/SignupScreen";
import DashBoardScreen from "./screens/dashboard/DashBoardScreen";
import AnalyticsScreen from "./screens/AnalyticsScreen"
import AdminOptions from "./screens/AdminOptions"

// Location Imports
import LocationsScreen from "./screens/locations/LocationsScreen";
import NewLocationScreen from "./screens/locations/NewLocationScreen";
import EditLocationScreen from "./screens/locations/EditLocationScreen";

// Storage Imports
import StorageScreen from "./screens/storages/StorageScreen";
import NewStorageScreen from "./screens/storages/NewStorageScreen";

// User Imports
import UserManagementScreen from "./screens/users/UserManagementScreen";
import ProfileScreen from "./screens/users/ProfileScreen";
import NewUserScreen from "./screens/users/NewUserScreen";

// Device Imports
import DeviceManagementScreen from "./screens/devices/DeviceManagementScreen";
import NewDeviceScreen from "./screens/devices/NewDeviceScreen";

// Asset Management Imports
import AssetManagementScreen from "./screens/asset_manag/AssetManagement";
import NewAssetScreen from "./screens/asset_manag/NewAssetScreen"

// Other Imports
import Settings from "./screens/other/Settings"
import SqlScreen from "./screens/other/SqlScreen";
import SupportScreen from "./screens/other/SupportScreen";
import AiSQLScreen from "./screens/other/AiSQLScreen"






const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
    index: true,
  },
  
  // Authentication Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "", element: <LoginScreen /> },
      { path: "signup", element: <SignupScreen /> },
    ],
    
  },

  // Admin Routes
  {
    path: "/admin",
    element: <DashBoardLayout />,
    children: [
      { path: "dashboard", element: <DashBoardScreen /> },

      // Storage routes
      { path: "storages", element: <StorageScreen /> },
      { path: "storages/new", element: <NewStorageScreen />},


      // Locations routes
      { path: "locations", element: <LocationsScreen /> },
      { path: "locations/new", element: <NewLocationScreen /> },
      { path: "locations/edit/:id", element: <EditLocationScreen /> },
      
      // User routes
      { path: "users", element: <UserManagementScreen /> },
      { path: "users/new", element: <NewUserScreen /> },
      { path: "users/profile", element: <ProfileScreen /> },
      
      // Device routes
      { path: "devices", element: <DeviceManagementScreen /> },      
      { path: "devices/new", element: <NewDeviceScreen /> },

      // Asset Management routes
      { path: "asset_management", element: <AssetManagementScreen/>}, 
      { path: "asset_management/new", element: <NewAssetScreen/>}, 

      // All / Other Options
      { path: "options", element: <AdminOptions />},
      { path: "settings", element: <Settings/>},
      { path: "sql-queries", element: <SqlScreen/>}, 
      { path: "support", element: <SupportScreen/>}, 
      { path: "analytics", element: <AnalyticsScreen/>}, 
      { path: "chatbot", element: <AiSQLScreen/>}, 




    ],
  },

  // Catch-all route for 404
  {
    path: "*",
    element: <NotFoundPage />, // This renders the custom 404 error page
  },


]);

export default router;

export const REACT_APP_API_URL = process.env.REACT_APP_API_URL