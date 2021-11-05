import "react-native-gesture-handler";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PortalProvider } from "@gorhom/portal";
import { ThemeContext, ThemeProvider } from "./src/context/theme/ThemeContext";
import { AuthNavigation } from "./src/navigator/AuthNavigation";
import { AuthProvider } from "./src/context/auth/AuthContext";
import { ProductProvider } from "./src/context/product/ProductContext";
import { CartProvider } from "./src/context/cart/CartContext";
import { OrderProvider } from "./src/context/order/OrderContext";

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <ThemeProvider>
              <PortalProvider>{children}</PortalProvider>
            </ThemeProvider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme}>
      <AppState>
        <AuthNavigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
